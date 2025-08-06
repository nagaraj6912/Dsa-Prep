import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight, Code } from "lucide-react";
import { Lecture } from "@/data/dsaCourse";
import { ProblemRow } from "./ProblemRow";
import { useNavigate } from "react-router-dom";

interface LectureCardProps {
  lecture: Lecture;
  stepId: string;
  onToggleProblem: (stepId: string, lectureId: string, problemId: string) => void;
}

export const LectureCard = ({ lecture, stepId, onToggleProblem }: LectureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const percentage = lecture.totalProblems > 0 ? Math.round((lecture.completedProblems / lecture.totalProblems) * 100) : 0;
  
  // Navigate to practice page with the first problem of the lecture
  const handlePracticeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lecture.problems.length > 0) {
      navigate(`/practice/${lecture.problems[0].id}`);
    }
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <div 
        className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            <h4 className="font-medium text-foreground">{lecture.title}</h4>
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-xs flex items-center gap-1 border-primary/30 hover:bg-primary/10 ml-2"
              onClick={handlePracticeClick}
              disabled={lecture.problems.length === 0}
            >
              <Code className="h-3 w-3" />
              Practice
            </Button>
          </div>
          <div className="text-right min-w-[100px]">
            <div className="text-sm font-medium text-foreground">
              {lecture.completedProblems} / {lecture.totalProblems}
            </div>
            <Progress 
              value={percentage} 
              className="w-20 h-1.5 mt-1" 
            />
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-border/50 bg-background/50">
          <div className="p-4">
            <div className="space-y-2">
              {lecture.problems.map((problem) => (
                <ProblemRow
                  key={problem.id}
                  problem={problem}
                  onToggle={() => onToggleProblem(stepId, lecture.id, problem.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};