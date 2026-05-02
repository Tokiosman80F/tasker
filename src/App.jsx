import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import TaskBoard from "./task/TaskBoard";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <div>
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}
