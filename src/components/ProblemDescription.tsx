import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ProblemDescriptionProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description?: string;
  examples?: string[];
  constraints?: string[];
}

export const ProblemDescription = ({
  title,
  difficulty,
  description,
  examples = [],
  constraints = []
}: ProblemDescriptionProps) => {
  // Get difficulty color class
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-progress-easy text-progress-easy-foreground';
      case 'Medium':
        return 'bg-progress-medium text-progress-medium-foreground';
      case 'Hard':
        return 'bg-progress-hard text-progress-hard-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-6">
        <Badge 
          variant="secondary" 
          className={`px-2 py-1 text-xs font-medium ${getDifficultyColor()}`}
        >
          {difficulty}
        </Badge>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <h3>Problem Description</h3>
        {description ? (
          <div className="text-foreground">
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={cn("bg-muted px-1 py-0.5 rounded text-sm", className)} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        ) : (
          <p>
            This is a placeholder for the problem description. In a real implementation, 
            this would contain the detailed problem statement, constraints, and examples.
          </p>
        )}
        
        <h3>Examples</h3>
        {examples.length > 0 ? (
          examples.map((example, index) => (
            <div key={index} className="mb-4">
              <SyntaxHighlighter
                style={vscDarkPlus}
                language="text"
                className="rounded-md my-2"
              >
                {example}
              </SyntaxHighlighter>
            </div>
          ))
        ) : (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language="text"
            className="rounded-md"
          >
            Input: [1, 2, 3]
            Output: 6
            Explanation: 1 + 2 + 3 = 6
          </SyntaxHighlighter>
        )}
        
        <h3>Constraints</h3>
        {constraints.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1">
            {constraints.map((constraint, index) => (
              <li key={index} className="text-foreground">{constraint}</li>
            ))}
          </ul>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            <li className="text-foreground">1 ≤ nums.length ≤ 10^5</li>
            <li className="text-foreground">-10^9 ≤ nums[i] ≤ 10^9</li>
          </ul>
        )}
      </div>
    </div>
  );
};