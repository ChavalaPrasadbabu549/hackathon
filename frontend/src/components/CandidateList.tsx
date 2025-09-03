import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

interface Candidate {
    _id: string;
    name: string;
    email: string;
    // add more fields if needed
}

interface CandidateListProps {
    candidates: Candidate[];
    onSelectCandidate?: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates, onSelectCandidate }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {candidates?.map((candidate) => (
                <Card
                    key={candidate._id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onSelectCandidate?.(candidate)}
                >
                    <CardHeader>
                        <CardTitle>{candidate.name}</CardTitle>
                        <CardDescription>{candidate.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Click to see more details</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CandidateList;
