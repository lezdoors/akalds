import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseErrorHandlerOptions {
  showToast?: boolean;
  onError?: (error: Error) => void;
  retryable?: boolean;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const { showToast = true, onError, retryable = false } = options;

  const handleError = useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);

    if (showToast) {
      toast({
        title: "Something went wrong",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    if (onError) {
      onError(error);
    }

    // Log error for development/monitoring
    console.error('Error handled:', error);
  }, [showToast, onError]);

  const executeWithErrorHandling = useCallback(async <T>(
    asyncFunction: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction();
      setIsLoading(false);
      setRetryCount(0);
      return result;
    } catch (error) {
      handleError(error as Error);
      return null;
    }
  }, [handleError]);

  const retry = useCallback(async <T>(
    asyncFunction: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T | null> => {
    if (!retryable || retryCount >= maxRetries) {
      return null;
    }

    setRetryCount(prev => prev + 1);
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await asyncFunction();
      setIsLoading(false);
      setRetryCount(0);
      
      if (showToast) {
        toast({
          title: "Success",
          description: "Operation completed successfully.",
        });
      }
      
      return result;
    } catch (error) {
      handleError(error as Error);
      return null;
    }
  }, [retryable, retryCount, handleError, showToast]);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  return {
    isLoading,
    error,
    retryCount,
    handleError,
    executeWithErrorHandling,
    retry,
    clearError,
    canRetry: retryable && retryCount < 3
  };
}

// Form-specific error handler
export function useFormErrorHandler() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldError = useCallback((field: string, error: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors(prev => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setFieldErrors({});
    setSubmitError(null);
  }, []);

  const handleSubmitError = useCallback((error: Error | string) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    setSubmitError(errorMessage);
    setIsSubmitting(false);
    
    toast({
      title: "Form submission failed",
      description: errorMessage,
      variant: "destructive",
    });
  }, []);

  const executeFormSubmission = useCallback(async <T>(
    submitFunction: () => Promise<T>
  ): Promise<T | null> => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      clearAllErrors();
      
      const result = await submitFunction();
      setIsSubmitting(false);
      
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });
      
      return result;
    } catch (error) {
      handleSubmitError(error as Error);
      return null;
    }
  }, [clearAllErrors, handleSubmitError]);

  return {
    fieldErrors,
    submitError,
    isSubmitting,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    handleSubmitError,
    executeFormSubmission,
    hasErrors: Object.keys(fieldErrors).length > 0 || !!submitError
  };
}