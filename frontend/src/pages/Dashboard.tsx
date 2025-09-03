import { useEffect, useState } from "react";
import CandidateList from "@/components/CandidateList";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import CommonDialog from "@/components/CommonDialog";
import CandidateForm from "@/components/CandidateForm";
import CandidateNotesForm from "@/components/CandidateNotesForm";
import instance from "@/utils/api";

interface Candidate {
    _id: string;
    name: string;
    email: string;
}

const Dashboard = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [addOpen, setAddOpen] = useState(false);

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const response = await instance.get("/candidates/getall");
            setCandidates(response?.data?.candidates || []);
        } catch (err) {
            console.error("Error fetching candidates data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Candidates Dashboard</h1>

                <CommonDialog
                    trigger={<Button>Add Candidate</Button>}
                    title="Add New Candidate"
                    open={addOpen}
                    onOpenChange={setAddOpen}
                    showCloseButton={true}
                >
                    <CandidateForm onSuccess={fetchCandidates} onClose={() => setAddOpen(false)} />
                </CommonDialog>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader2Icon className="animate-spin w-6 h-6" />
                </div>
            ) : (
                <CandidateList
                    candidates={candidates}
                    onSelectCandidate={(candidate) => setSelectedCandidate(candidate)}
                />
            )}

            {selectedCandidate && (
                <CommonDialog
                    title="Candidate Notes"
                    open={!!selectedCandidate}
                    onOpenChange={() => setSelectedCandidate(null)}
                >
                    <CandidateNotesForm
                        candidateId={selectedCandidate._id}
                        onSuccess={() => console.log("Note saved successfully")}
                    />
                </CommonDialog>
            )}
        </div>
    );
};

export default Dashboard;
