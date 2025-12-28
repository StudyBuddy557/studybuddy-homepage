export function SchoolSearch({ schools }: { schools: any[] }) {
  return (
    <div className="p-4">
      <input 
        type="search" 
        placeholder="Search schools..." 
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
