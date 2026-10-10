import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page narrow center">
      <h1>Siden finnes ikke</h1>
      <p className="muted">Kanskje den har flyttet. Prøv forsiden.</p>
      <Link href="/" className="btn">Til forsiden</Link>
    </div>
  );
}
