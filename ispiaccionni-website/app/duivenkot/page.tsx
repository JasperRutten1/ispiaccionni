import Image from "next/image";
import { Profile } from "@/components/Profile";

export default function AboutPage() {
  return (
    <main className="mx-5 lg:mx-15 my-10 rounded-md bg-gray-800 p-5 lg:p-10 text-white flex flex-col gap-2">
      <h2 className="text-4xl font-semibold text-amber-200">Duivenkot</h2>
      <div className="w-full flex justify-center">
        <Profile
          image="/images/duiven/groep-foto.jpeg"
          title="I Spiaccionni"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-2 lg:gap-5">
        <Profile
          image="/images/duiven/kirsten.jpeg"
          title="Opperduif"
        />
        <Profile
          image="/images/duiven/thomas.jpeg"
          title="Master Pigeon"
        />
        <Profile
          image="/images/duiven/lorens.jpeg"
          title="Postduif"
        />
        <Profile
          image="/images/duiven/imani.jpeg"
          title="Pink Pigeon"
        />
        <Profile
          image="/images/duiven/yasmine.jpeg"
          title="Moe Duifje"
        />
        <Profile
          image="/images/duiven/jack.jpeg"
          title="Duivenjager"
        />
        <Profile
          image="/images/duiven/nils.jpeg"
          title="Broke Pigeon"
        />
        <Profile
          image="/images/duiven/jasper.jpeg"
          title="Tech Pigeon"
        />
        <Profile
          image="/images/duiven/jo.jpeg"
          title="Druif Duif"
        />
        <Profile
          image="/images/duiven/jorden.jpeg"
          title="Duivenhouder"
        />
        <Profile
          image="/images/duiven/luka.jpeg"
          title="ADHDuif"
        /><Profile
          image="/images/duiven/seth.jpeg"
          title="Dropping Specialist"
        />
        <Profile
          image="/images/duiven/maxim.jpeg"
          title="Vertraagde Duif"
        />
        <Profile
          image="/images/duiven/elisabeth.jpeg"
          title="Werkduif"
        />
        <Profile
          image="/images/duiven/rat.jpeg"
          title="Rat van't stad"
        />
        <Profile
          image="/images/duiven/copilot.jpeg"
          title="Piloot Duif"
        />
      </div>
    </main>
  );
}
