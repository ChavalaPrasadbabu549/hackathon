import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import instance from "@/utils/api";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface User {
    _id: string;
    name: string;
    email: string;
}

interface CandidateNotesFormProps {
    candidateId: string;
    onSuccess: () => void;
}

const CandidateNotesForm = ({ candidateId, onSuccess }: CandidateNotesFormProps) => {
    const [message, setMessage] = useState("");
    const [mentions, setMentions] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch users for mentions
    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const res = await instance.get("/user/getall");
                console.log(res)
                setUsers(res.data?.users || []);
            } catch (err) {
                console.error("Error fetching users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { candidateId, message, mentions, };
            const res = await instance.post("/notes/signup", payload);
            if (res.status === 201) {
                toast.success(res.data?.message || "Note added successfully!");
                setMessage("");
                setMentions([]);
                onSuccess();
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to add note");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMention = (userId: string) => {
        if (!mentions.includes(userId)) {
            setMentions([...mentions, userId])
        }
    }

    const removeMention = (id: string) => {
        setMentions(mentions.filter((m) => m !== id))
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Input
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a note..."
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label>Mentions</Label>
                    <Select onValueChange={handleSelectMention}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a user to mention" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user._id} value={user._id}>
                                    {user.name} ({user.email})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : "Add Note"}
            </Button>
        </form>
    );
};

export default CandidateNotesForm;
