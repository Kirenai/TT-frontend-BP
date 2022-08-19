import { Link } from 'react-router-dom';

interface UpdateDeleteProps {
  entityUrl: string;
  entityId: number;
  remove: (id: number) => void;
}

const UpdateDelete = ({ entityId, entityUrl, remove }: UpdateDeleteProps) => {
  return (
    <div className='group-action'>
      <Link className='update-button' to={`/${entityUrl}/update/${entityId}`}>
        Actualizar
      </Link>
      <button className='delete-button' onClick={() => remove(entityId)}>
        Eliminar
      </button>
    </div>
  );
};

export default UpdateDelete;
