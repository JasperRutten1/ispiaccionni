import { Activity } from "@/components/Activity";

export default function ActiviteitenPage() {
  return (
    <main className="mx-5 lg:mx-15 my-10 rounded-md bg-gray-800 p-5 lg:p-10 text-white">
      <h2 className="mb-4 text-4xl font-semibold text-amber-200">Activiteiten</h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <Activity
          image="/images/shooting.jpeg"
          title="Kleiduif Schieten"
          description="We gaan onze shiet skills oefenen om van ver alle duiven kunnen stoppen met opladedn op de elekticiteitskabels."
        />
        <Activity
          image="/images/melken.jpeg"
          title="Duiven melken"
          description="We zullen samen ondervinden of duiven ook zat hun weg terug naar huis vinden. "
        />
        <Activity
          image="/images/rip.jpeg"
          title="Minuut stilte"
          description="Een minuut stilte voor alle kringen, kiesploegen en organisaties die onze spionage niet overleefd hebben."
        />
      </div>
      
    </main>
  );
}
