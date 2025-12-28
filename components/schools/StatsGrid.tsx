export function StatsGrid({ school }: { school: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Acceptance Rate</h3>
        <p>{school.acceptanceRate || 'N/A'}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Students</h3>
        <p>{school.students || 'N/A'}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold">Location</h3>
        <p>{school.location || 'N/A'}</p>
      </div>
    </div>
  );
}
