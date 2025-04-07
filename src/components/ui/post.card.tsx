// components/PostCard.tsx
export default function PostCard({
  title,
  body,
  imageUrl,
}: {
  title: string;
  body: string;
  imageUrl: string;
}) {
  return (
    <div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex">
      <img className="w-50 h-50 object-cover" src={imageUrl} alt={title} />
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">{body}</p>
      </div>
    </div>
  );
}
