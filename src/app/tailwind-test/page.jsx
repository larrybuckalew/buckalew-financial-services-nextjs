export default function TailwindTestPage() {
    return (<div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">Tailwind Styling Test</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-primary-light text-primary-dark p-4 rounded-lg shadow-md">
          Primary Light Background
        </div>
        <div className="bg-secondary text-white p-4 rounded-lg shadow-md">
          Secondary Background
        </div>
        <div className="border-2 border-primary p-4 rounded-lg">
          Primary Border
        </div>
      </div>
    </div>);
}
