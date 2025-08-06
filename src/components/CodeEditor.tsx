import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Copy, Check } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
  onRun: () => void;
  status: 'idle' | 'running' | 'success' | 'error';
}

export const CodeEditor = ({
  code,
  language,
  onChange,
  onRun,
  status
}: CodeEditorProps) => {
  const [copied, setCopied] = useState(false);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  // Get language-specific syntax highlighting class
  const getLanguageClass = () => {
    switch (language) {
      case 'javascript':
        return 'language-javascript';
      case 'python':
        return 'language-python';
      case 'java':
        return 'language-java';
      case 'cpp':
        return 'language-cpp';
      default:
        return 'language-javascript';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/50">
        <div className="text-sm font-medium">
          {language === 'javascript' ? 'JavaScript' :
           language === 'python' ? 'Python' :
           language === 'java' ? 'Java' :
           language === 'cpp' ? 'C++' : 'Code'}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            variant={status === 'error' ? 'destructive' : status === 'success' ? 'success' : 'default'}
            size="sm"
            className="h-8 px-3 gap-1"
            onClick={onRun}
            disabled={status === 'running'}
          >
            <Play className={cn("h-3 w-3", status === 'running' && "animate-spin")} />
            {status === 'running' ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            tabSize: 2,
            automaticLayout: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
          }}
          loading={<div className="p-4 text-sm text-muted-foreground">Loading editor...</div>}
        />
      </div>
    </div>
  );
};