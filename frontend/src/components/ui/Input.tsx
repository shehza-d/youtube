export default function Input({ id }: { id: string }) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="mb-1 inline-block text-gray-300">
        {id}*
      </label>
      <input
        id={id}
        type={id || "text"}
        placeholder={`Enter your ${id}`}
        className="mb-4 rounded-lg border bg-transparent px-3 py-2"
      />
    </div>
  );
}
