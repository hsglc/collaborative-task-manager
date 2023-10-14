export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="no-underline bg-btn-background">
        Logout
      </button>
    </form>
  )
}
