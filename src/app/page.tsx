import { publishNotification } from "./actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        /* set the server action to invoked as form is submitted */
        action={publishNotification}
      >
        {/* Place a client side form component here */}
      </form>
    </main>
  );
}
