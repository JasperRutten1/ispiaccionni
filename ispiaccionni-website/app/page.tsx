import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="w-full flex justify-center">
        <div className="w-full justify-left flex text-3xl flex-row px-5 bg-black">
          <Image
            className="w-25"
            src="/images/logo.png"
            width={500}
            height={500}
            alt="Pigeons are a lie"
          />
          
          <div className="h-full flex align-bottom">
            <h1 className="text-amber-50 py-10 px-10">I Spiaccionni</h1>
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center">
        <Image
          className="border-solid border-2 border-black rounded-md m-5 w-50"
          src="/images/pigeon-vibes.gif"
          width={500}
          height={500}
          alt="Pigeons are a lie"
        />
      </div>

      <div className="mx-20 bg-gray-500 p-10 flex flex-col gap-2 text-lg rounded-md">
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
      </div>
    </main>
  );
}
