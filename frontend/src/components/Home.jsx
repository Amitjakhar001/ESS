import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleModifyData = () => {
    navigate('/data');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <Button onClick={handleModifyData}>Modify Data</Button>
      {/* Other content */}
    </div>
  );
}