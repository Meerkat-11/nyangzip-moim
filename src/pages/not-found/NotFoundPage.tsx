export default function NotFoundPage() {
  return (
    <div className="page-shell not-found-shell">
      <div className="empty-card">
        <h1>404</h1>
        <p>페이지를 찾을 수 없어요.</p>
        <a href="/" className="primary-button">
          홈으로 이동
        </a>
      </div>
    </div>
  );
}
