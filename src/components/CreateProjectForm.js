import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimated_due: '',
    custom_status: '',
    completed: false,
    status_note: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const result = await response.json();
      console.log('Project created:', result);
      navigate('/projects'); // Redirect to projects list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create New Project</h2>
      {error && (
        <Alert variant="destructive" className="mb-5">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="estimated_due" className="block text-sm font-medium text-gray-700">Estimated Due Date</label>
          <Input
            type="datetime-local"
            id="estimated_due"
            name="estimated_due"
            value={formData.estimated_due}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="custom_status" className="block text-sm font-medium text-gray-700">Custom Status</label>
          <Input
            type="text"
            id="custom_status"
            name="custom_status"
            value={formData.custom_status}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center">
          <Checkbox
            id="completed"
            name="completed"
            checked={formData.completed}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, completed: checked }))}
          />
          <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">Completed</label>
        </div>
        <div>
          <label htmlFor="status_note" className="block text-sm font-medium text-gray-700">Status Note</label>
          <Textarea
            id="status_note"
            name="status_note"
            value={formData.status_note}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <Button type="submit" className="w-full">Create Project</Button>
      </form>
    </div>
  );
};

export default CreateProjectForm;