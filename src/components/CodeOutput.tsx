import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeOutputProps {
  output: string;
  status?: 'idle' | 'running' | 'success' | 'error';
}

export const CodeOutput = ({ output, status = 'idle' }: CodeOutputProps) => {
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLPreElement>(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
    }
  };

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Output</div>
          {status === 'running' && (
            <div className="flex items-center gap-1 text-xs text-amber-500">
              <Clock className="h-3 w-3 animate-spin" />
              <span>Running...</span>
            </div>
          )}
          {status === 'success' && (
            <div className="flex items-center gap-1 text-xs text-green-500">
              <CheckCircle2 className="h-3 w-3" />
              <span>Completed</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              <span>Error</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={copyToClipboard}
          disabled={!output}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre 
        ref={outputRef}
        className={cn(
          "flex-1 p-4 font-mono text-sm bg-background overflow-auto whitespace-pre-wrap",
          status === 'error' && "text-red-500",
          status === 'success' && "text-green-500"
        )}
      >
        {output || (
          <span className="text-muted-foreground">
            {status === 'idle' && "Run your code to see output here"}
            {status === 'running' && "Executing code..."}
            {status === 'success' && "No output generated"}
            {status === 'error' && "No error details available"}
          </span>
        )}
      </pre>
    </div>
  );
};