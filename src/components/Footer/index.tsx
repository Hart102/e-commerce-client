import { Link } from "react-router-dom";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-deep-gray-200 text-sm">
      <div className="container mx-auto flex flex-col items-center gap-8 py-8">
        <Link to="/" className="text-2xl font-bold first-letter:text-3xl">
          Spline.One
        </Link>

        <div className="flex gap-4">
          <Link to="">Fashion</Link>
          <Link to="">Jewerrey</Link>
          <Link to="">Electronics</Link>
        </div>

        <div className="flex gap-4">
          <Link to="">
            <FaGoogle />
          </Link>
          <Link to="">
            <FaTwitter />
          </Link>
          <Link to="">
            <FaFacebook />
          </Link>
        </div>
      </div>
    </div>
  );
}
