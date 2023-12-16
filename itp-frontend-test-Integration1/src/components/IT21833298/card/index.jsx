
import { Link } from 'react-router-dom';

const Card = ({ title, subtitle, link, buttonText }) => {
  return (
    <div className="block p-4 border border-gray-300 rounded-lg hover:bg-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
      <Link
        to={link}
        className="mt-6 inline-block px-4 py-2 text-sm font-medium text-white rounded-lg"
        style={{ backgroundColor: '#e64d22' }}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default Card;