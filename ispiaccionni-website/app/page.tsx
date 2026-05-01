'use client';

import { HomeClayEntry } from "@/components/HomeClayEntry";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  const handleGifClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      router.push('/poop');
    }
  };

  return (
    <main className="mx-5 lg:mx-15 my-10 rounded-md bg-gray-800 p-5 lg:p-10 text-white">
      <div className="w-full flex justify-center flex-wrap gap-2">
        <Image
          className="border-solid border-2 border-black rounded-md w-50"
          src="/images/wip.jpeg"
          width={500} 
          height={500}
          alt="Pigeons are a lie"
        />

        <Image
          className="border-solid border-2 border-black rounded-md w-50 cursor-pointer"
          src="/images/pigeon-vibes.gif"
          width={500}
          height={500}
          alt="Pigeons are a lie"
          onClick={handleGifClick}
        />
      </div>

      <HomeClayEntry>
        <p>
          Welkom, wakkere burger. 🕊️
        </p>
        <p>
          Je bent hier niet per ongeluk. Nee. Niemand “belandt zomaar” op deze site. Dat is precies wat ZIJ willen dat je denkt.
        </p>
        <p>
          Al jaren proberen ze het te verbergen. Eerst waren het geruchten. Toen “grapjes”. Maar wij weten beter. Duiven zijn geen duiven.
        </p>
        <p>
          Ze kijken. Ze luisteren. Ze knikken verdacht vaak met hun hoofd. Waarom? Denk daar eens over na.
        </p>
        <p>
          De overheid heeft miljarden geïnvesteerd in het Project Avian Surveillance Unit (A.S.U.). Wat jij ziet als een onschuldige stadsduif, is in werkelijkheid een hypergeavanceerde drone met ingebouwde microfoons, camera’s en – volgens sommige bronnen – een kleine maar efficiënte espressofunctie.
        </p>
        <p>
          Waarom zitten duiven altijd op standbeelden? Hoogtevoordeel. Waarom zitten ze op elektriciteitskabels? Opladen. Waarom vliegen ze weg als je te dichtbij komt? Omdat je bijna hun USB-poort hebt gezien.
        </p>
        <p>
          Toeval? Word wakker.
        </p>
        <p>
          Onze lolploeg bestaat uit moedige individuen die hun ware identiteit hebben opgegeven en zich hebben aangesloten bij de waarheid. Wij zijn niet bang. (Oké, een beetje misschien, vooral voor duiven met zonnebrillen.)
        </p>
        <p>
          Wij eisen transparantie. Wij eisen antwoorden. En vooral: wij eisen dat duiven zich eens normaal gaan gedragen.
        </p>
        <p>
          Stem op ons, en samen zetten we de eerste stap naar een wereld waarin broodkruimels weer gewoon broodkruimels zijn – en geen afleidingsmanoeuvre van het Ministerie van Gevederde Zaken.
        </p>
        <p>
          Blijf kijken. Word wakker! Vertrouw niemand!
          Vooral geen duif die je recht aankijkt.
        </p>

      </HomeClayEntry>

      <div className="text-center mt-6">
        <p className="opacity-50">🕊️ T:576,R:3,V:568,I:5,o:0 🕊️</p>
      </div>
    </main>
  );
}
