export type MerchCategory =
  | "Drank & servies"
  | "Kleding"
  | "Stickers & papier"
  | "Absurdisme"
  | "Premium / dieren";

export type MerchItem = {
  id: number;
  title: string;
  shortDescription: string;
  votes: number;
  category: MerchCategory;
};

export const MERCH_CATEGORIES: MerchCategory[] = [
  "Drank & servies",
  "Kleding",
  "Stickers & papier",
  "Absurdisme",
  "Premium / dieren",
];

export const MERCH_CATALOG: MerchItem[] = [
  {
    id: 1,
    title: "Mok ‘Wakker worden’",
    shortDescription:
      "Voor koffie die net zo bitter is als de waarheid. Officieel geen afluisterapparaat in het oor.",
    votes: 5,
    category: "Drank & servies",
  },
  {
    id: 2,
    title: "T-shirt basis logo",
    shortDescription:
      "Zwaar katoen, frontprint met duif-in-zonnebril, kabelmotief en ‘I Spiaccionni’-typo. Klaar om te knielen bij het voederen van ‘duiven’.",
    votes: 10,
    category: "Kleding",
  },
  {
    id: 3,
    title: "Theeglas met complotrand",
    shortDescription:
      "Extra dik glas: ideaal als je plots schrikt van een duif die je aanstikt.",
    votes: 6,
    category: "Drank & servies",
  },
  {
    id: 4,
    title: "Beker ‘Broodkruimels zijn een val’",
    shortDescription:
      "Hydratatie voor wie begrijpt dat kruimels tactiek zijn van het Ministerie van Gevederde Zaken.",
    votes: 7,
    category: "Drank & servies",
  },
  {
    id: 5,
    title: "Shotglaasje A.S.U.",
    shortDescription:
      "Klein glas, grote claims. Niet geschikt voor echte dossiers — wél voor moraal.",
    votes: 8,
    category: "Drank & servies",
  },
  {
    id: 6,
    title: "Drinkfles ‘Mistrust’",
    shortDescription:
      "Geborsteld staal, lasergravure: duiven op kabels als printplaat-sporen. BPA-vrij volgens ons — controleer zelf.",
    votes: 12,
    category: "Drank & servies",
  },
  {
    id: 7,
    title: "Kurkentrekker ‘Geheime kelder’",
    shortDescription:
      "Voor rode wijn en rode draadjes. Opent ook flessen, naar verluidt.",
    votes: 15,
    category: "Drank & servies",
  },
  {
    id: 8,
    title: "T-shirt ‘Ze kijken’",
    shortDescription:
      "Met rugprint voor wie achter zich durft te kijken. Spoiler: er staat een duif.",
    votes: 15,
    category: "Kleding",
  },
  {
    id: 9,
    title: "Hoodie zwart deluxe",
    shortDescription:
      "Zwart fleece, capuchon met ton-sur-ton duivenveren-jacquard, borstpatch met laserduif. Verberg je identiteit — of je slechte take.",
    votes: 45,
    category: "Kleding",
  },
  {
    id: 10,
    title: "Hoodie ‘USB-poort bijna gezien’",
    shortDescription:
      "Warm vanbinnen, koud vanbuiten. Net zoals de relatie met de overheid.",
    votes: 50,
    category: "Kleding",
  },
  {
    id: 11,
    title: "Snapback pet",
    shortDescription:
      "Rechte klep: handig tegen zon én tegen duiven die te laag vliegen.",
    votes: 25,
    category: "Kleding",
  },
  {
    id: 12,
    title: "Beanie wintereditie",
    shortDescription:
      "Oren warm, complotten warmer. Past onder een helm van een spotter.",
    votes: 22,
    category: "Kleding",
  },
  {
    id: 13,
    title: "Sokken ‘pigeon eyes’",
    shortDescription:
      "Zachte stap, harde blik. Combineer met sandalen op eigen risico.",
    votes: 18,
    category: "Kleding",
  },
  {
    id: 14,
    title: "Slippers badkamer",
    shortDescription:
      "Antislip. Want als je uitglijdt, lachen ze — en ‘zij’ horen dat.",
    votes: 20,
    category: "Kleding",
  },
  {
    id: 15,
    title: "Trui feestdagen (limited lie)",
    shortDescription:
      "Rode trui, witte leugens, groene duiven? Iets met kleuren. Feestelijk genoeg.",
    votes: 35,
    category: "Kleding",
  },
  {
    id: 16,
    title: "Emaille pin klein",
    shortDescription:
      "Voor op je revers, je rugzak of je ziel. Klein maar verdacht.",
    votes: 8,
    category: "Stickers & papier",
  },
  {
    id: 17,
    title: "Stickervel A4",
    shortDescription:
      "Mat gelamineerd — of toch niet? Plak het op je laptop en word gevolgd door complimenten.",
    votes: 10,
    category: "Stickers & papier",
  },
  {
    id: 18,
    title: "Stickerset ‘Laptop camouflage’",
    shortDescription:
      "Maakt je toestel onleesbaar voor… iemand. Zeker niet voor jezelf, hopelijk.",
    votes: 14,
    category: "Stickers & papier",
  },
  {
    id: 19,
    title: "Poster WANTED: duif",
    shortDescription:
      "A2-formaat. Hang hem op waar buren het zeker zien. Sociale cohesie gegarandeerd.",
    votes: 25,
    category: "Stickers & papier",
  },
  {
    id: 20,
    title: "Notitieboek ‘Field notes: dak’",
    shortDescription:
      "Gelijnd papier voor waarnemingen. Eerste regel: ‘Niet te dichtbij komen.’",
    votes: 16,
    category: "Stickers & papier",
  },
  {
    id: 21,
    title: "Pennenbak ‘USB-poort’",
    shortDescription:
      "Houdt pennen rechtop. Houdt geheimen scheef. Decoratief absurdisme.",
    votes: 30,
    category: "Absurdisme",
  },
  {
    id: 22,
    title: "Muismat XXL",
    shortDescription:
      "Ruim genoeg voor muis én paranoia. Glad oppervlak, ruwe werkelijkheid.",
    votes: 28,
    category: "Stickers & papier",
  },
  {
    id: 23,
    title: "Tote bag canvas",
    shortDescription:
      "Voor brood — dat gewoon brood is. Of toch? Boodschappen doen met attitude.",
    votes: 20,
    category: "Kleding",
  },
  {
    id: 24,
    title: "Rugzak mini",
    shortDescription:
      "Canvas mini-rugzak met goudbroodkruimel-borduursel en kleine duif — voor je fles water en je map van vier pagina’s ‘bewijs’.",
    votes: 55,
    category: "Kleding",
  },
  {
    id: 25,
    title: "Sleutelhanger silhouet",
    shortDescription:
      "Metaal. Klinkt mysterieus in je broekzak. Is gewoon een sleutelhanger.",
    votes: 12,
    category: "Stickers & papier",
  },
  {
    id: 26,
    title: "Telefoonhoesje universeel (theater)",
    shortDescription:
      "Past ‘bijna’ op elke gsm. Net zo universeel als onze theorieën.",
    votes: 38,
    category: "Absurdisme",
  },
  {
    id: 27,
    title: "Zonnebril ‘Te dichtbij’",
    shortDescription:
      "Acetaat zwart, gegraveerde tempels met veer- en golfmotief; spiegellens reflecteert mini-duif. UV volgens etiket — twijfel is gezond.",
    votes: 70,
    category: "Kleding",
  },
  {
    id: 28,
    title: "Paraplu zwart",
    shortDescription:
      "Tegen regen, tegen drones? In elk geval tegen nat haar tijdens stake-outs.",
    votes: 32,
    category: "Kleding",
  },
  {
    id: 29,
    title: "Strandhanddoek",
    shortDescription:
      "Groot genoeg om jezelf te verstoppen als er een duif landt op je picknickmand.",
    votes: 42,
    category: "Kleding",
  },
  {
    id: 30,
    title: "Kookschort",
    shortDescription:
      "Voor wie kookt met passie en eet met wantrouwen. Vlekken zijn ‘bewijs’.",
    votes: 35,
    category: "Kleding",
  },
  {
    id: 31,
    title: "Ovenwanten set (2)",
    shortDescription:
      "Hittebestendig volgens de mythe. Net als onze hoop op transparantie.",
    votes: 24,
    category: "Drank & servies",
  },
  {
    id: 32,
    title: "Blikjeskoeler draagbaar",
    shortDescription:
      "Houdt drankjes koud en gesprekken warm. Op eigen risico op het plein.",
    votes: 30,
    category: "Drank & servies",
  },
  {
    id: 33,
    title: "Fluitje ‘niet van een duif’",
    shortDescription:
      "Klinkt scherp. Geschikt om aandacht te trekken — of duiven te irriten.",
    votes: 18,
    category: "Absurdisme",
  },
  {
    id: 34,
    title: "Speelgoedverrekijker",
    shortDescription:
      "Plastic lens, echte intentie. Voor kinderen die vroeg willen ‘wakker’ worden.",
    votes: 45,
    category: "Absurdisme",
  },
  {
    id: 35,
    title: "Walkie-talkie set (nep)",
    shortDescription:
      "Maakt geluiden. Ontvangt vooral uw verbeelding. Top voor rollenspel A.S.U.",
    votes: 50,
    category: "Absurdisme",
  },
  {
    id: 36,
    title: "Anti-duif spray (placebo)",
    shortDescription:
      "Fles met vertrouwen. Inhoud: lucht en dromen. Niet inspruiten in USB-poorten.",
    votes: 22,
    category: "Absurdisme",
  },
  {
    id: 37,
    title: "Broodkruimel-detector (LED-spel)",
    shortDescription:
      "Knippert willekeurig. Bewezen niet-wetenschappelijk. Wel hilarisch op feestjes.",
    votes: 60,
    category: "Absurdisme",
  },
  {
    id: 38,
    title: "USB-stick vorm duif",
    shortDescription:
      "Opslagcapaciteit: symbolisch. Geschikt om ‘bewijs’ te verplaatsen tussen laptops.",
    votes: 55,
    category: "Absurdisme",
  },
  {
    id: 39,
    title: "Powerbank met complotsticker",
    shortDescription:
      "10.000 mAh volgens doos. De doos liegt nooit — toch?",
    votes: 90,
    category: "Absurdisme",
  },
  {
    id: 40,
    title: "Drone-jammer (lege doos collector’s)",
    shortDescription:
      "Premium verpakking, minimale inhoud. Conceptuele kunst voor techsceptici.",
    votes: 120,
    category: "Absurdisme",
  },
  {
    id: 41,
    title: "Diploma ‘Duivenspecialist niveau 1’",
    shortDescription:
      "Geprint op dik papier. Officieel nergens erkend. Emotioneel wél goud waard.",
    votes: 75,
    category: "Stickers & papier",
  },
  {
    id: 42,
    title: "Spotterhelm (cardboard upgrade)",
    shortDescription:
      "Veiligheid eerst — vooral voor uw ego. Met elastiek en ambitie.",
    votes: 85,
    category: "Absurdisme",
  },
  {
    id: 43,
    title: "Reflecterend hesje",
    shortDescription:
      "Zichtbaar voor auto’s, onzichtbaar voor het systeem (niet echt).",
    votes: 48,
    category: "Kleding",
  },
  {
    id: 44,
    title: "GPS voor broodkruimels (prop)",
    shortDescription:
      "Scherm toont ‘Zoekend…’ voor altijd. Poëtisch, niet praktisch.",
    votes: 95,
    category: "Absurdisme",
  },
  {
    id: 45,
    title: "Nachtzichtbril (karton)",
    shortDescription:
      "Beperkt zicht, onbeperkte vibes. Breekbaar — net als complotten.",
    votes: 65,
    category: "Absurdisme",
  },
  {
    id: 46,
    title: "Megafoon mini",
    shortDescription:
      "Voor korte speeches op het plein. Batterijen: ‘ergens’.",
    votes: 40,
    category: "Absurdisme",
  },
  {
    id: 47,
    title: "Laserpointer ‘niet voor katten’",
    shortDescription:
      "Richt nooit op vliegtuigen. Of duiven. Of buren. Of toch?",
    votes: 28,
    category: "Absurdisme",
  },
  {
    id: 48,
    title: "Wandklok zonder wijzers",
    shortDescription:
      "Tijd is een illusie. De klok ook. Hangt filosofisch mooi in de woonkamer.",
    votes: 88,
    category: "Absurdisme",
  },
  {
    id: 49,
    title: "Bordspel ‘Project A.S.U.’",
    shortDescription:
      "Dobbelstenen, kaarten, ruzie. Regels bewust vaag — net als echte dossiers.",
    votes: 110,
    category: "Absurdisme",
  },
  {
    id: 50,
    title: "Luxe geschenkdoos (inhoud: mysterie)",
    shortDescription:
      "Voelt zwaar. Klinkt hol. Ideaal cadeau voor wie alles al denkt te weten.",
    votes: 150,
    category: "Absurdisme",
  },
  {
    id: 51,
    title: "VIP-lamineerkaart",
    shortDescription:
      "Glanzend plastic, matige privileges. Wel vooraan in de rij van uw verbeelding.",
    votes: 200,
    category: "Premium / dieren",
  },
  {
    id: 52,
    title: "Gesigneerde krabbel (echt nep)",
    shortDescription:
      "Uniek kunstwerk. Onduidelijke handtekening. Authenticiteit: emotioneel.",
    votes: 180,
    category: "Premium / dieren",
  },
  {
    id: 53,
    title: "Crowdfunding-tegel ‘Top stemmer’",
    shortDescription:
      "Keramische tegel met typfouten. Hangt mooi naast uw diploma’s van niets.",
    votes: 220,
    category: "Premium / dieren",
  },
  {
    id: 54,
    title: "Meet & greet met een ‘duif’ (rollenspel)",
    shortDescription:
      "15 minuten spanning. Kostuum kwaliteit: discussieerbaar. Herinnering: onbetaalbaar.",
    votes: 350,
    category: "Premium / dieren",
  },
  {
    id: 55,
    title: "Postduif-koerier met diploma",
    shortDescription:
      "Levendige service. Levert brieven — als de wind mee zit en de duif niet oplaadt.",
    votes: 500,
    category: "Premium / dieren",
  },
  {
    id: 56,
    title: "Mok ‘Opladen op kabels’",
    shortDescription:
      "Voor wie weet dat elektriciteitsdraden eigenlijk laadstations zijn.",
    votes: 5,
    category: "Drank & servies",
  },
  {
    id: 57,
    title: "Sticker ‘Ministerie van Gevederde Zaken’",
    shortDescription:
      "Officieel onofficieel. Plakken op eigen risico — en dat van uw leaseauto.",
    votes: 9,
    category: "Stickers & papier",
  },
  {
    id: 58,
    title: "Polo premium",
    shortDescription:
      "Piqué zwart met ton-sur-ton duiven en broodkruimels in jacquard, knopen met subtiele pootafdruk. Gemeenteraad overdag, complotborrel ’s avonds.",
    votes: 42,
    category: "Kleding",
  },
];

export function getMerchById(id: number): MerchItem | undefined {
  return MERCH_CATALOG.find((item) => item.id === id);
}
