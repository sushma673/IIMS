import InstituteCard from "./InstituteCard";

export default function InstituteCards({ institutes }) {
  if (!institutes || institutes.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No institutes available
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {institutes.map((inst) => (
        <InstituteCard key={inst.id} institute={inst} />
      ))}
    </div>
  );
}
