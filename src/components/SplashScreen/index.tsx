import Loader from "../Loader";
import Logo from "../Logo";

export default function SplashScreen() {
  return (
    <main className="bg-primary text-white h-screen overflow-hidden w-screen flex justify-center items-center flex-col gap-3">
      <div className="flex-col gap-5 flex justify-center h-full w-full items-center ">
        <Logo h="h-10" w="w-30" />
        <h1 className="mt-7 md:text-xl text-md font-semibold ">Vamos viajar juntos.</h1>
        <Loader type="Spinner" />
      </div>
    </main>
  );
}
