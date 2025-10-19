export function RecentQuotes() {
  const quotes = [
    {
      id: 1,
      name: "John Doe",
      type: "Medicare Advantage",
      date: "2025-01-26",
      status: "Pending"
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Life Insurance",
      date: "2025-01-25",
      status: "Completed"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Quotes</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Type</th>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-b">
                <td className="py-3">{quote.name}</td>
                <td className="py-3">{quote.type}</td>
                <td className="py-3">{quote.date}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    quote.status === 'Completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {quote.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}