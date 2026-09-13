import { Trash2 } from "lucide-react";

const AssetList = ({ items, isLoading, coverField, onDelete }) => {
  if (isLoading) return <p className='text-sm text-gray-500'>Loading...</p>;
  if (!items?.length) return <p className='text-sm text-gray-500'>No items yet.</p>;

  return (
    <div className='divide-y'>
      {items.map((item) => (
        <div key={item._id} className='flex items-center gap-3 py-3'>
          <img
            src={item[coverField]?.url}
            alt=''
            className='size-10 rounded-md object-cover bg-gray-100'
          />
          <p className='flex-1 text-sm font-medium truncate'>{item.title}</p>
          <button onClick={() => onDelete(item._id)} className='text-red-500 hover:text-red-600  cursor-pointer'>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssetList;