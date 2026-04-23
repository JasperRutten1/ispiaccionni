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
  /** English prompt for image API */
  imagePrompt: string;
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
    imagePrompt: "product photo white ceramic coffee mug conspiracy pigeon theme minimal studio",
  },
  {
    id: 2,
    title: "T-shirt basis logo",
    shortDescription:
      "Zwaar katoen, frontprint met duif-in-zonnebril, kabelmotief en ‘I Spiaccionni’-typo. Klaar om te knielen bij het voederen van ‘duiven’.",
    votes: 10,
    category: "Kleding",
    imagePrompt:
      "Ultra detailed black heavyweight cotton t-shirt flat lay weathered wood, intricate screen print pigeon in aviator shades CCTV glints in lenses, tangled power lines USB cord border cracked eggshell frame distressed newsprint collage, woven label Mistrust, moody rim light shallow DOF premium streetwear catalog 8k",
  },
  {
    id: 3,
    title: "Theeglas met complotrand",
    shortDescription:
      "Extra dik glas: ideaal als je plots schrikt van een duif die je aanstikt.",
    votes: 6,
    category: "Drank & servies",
    imagePrompt: "glass tea cup conspiracy meme style product photo",
  },
  {
    id: 4,
    title: "Beker ‘Broodkruimels zijn een val’",
    shortDescription:
      "Hydratatie voor wie begrijpt dat kruimels tactiek zijn van het Ministerie van Gevederde Zaken.",
    votes: 7,
    category: "Drank & servies",
    imagePrompt: "plastic reusable cup funny conspiracy slogan merchandise photo",
  },
  {
    id: 5,
    title: "Shotglaasje A.S.U.",
    shortDescription:
      "Klein glas, grote claims. Niet geschikt voor echte dossiers — wél voor moraal.",
    votes: 8,
    category: "Drank & servies",
    imagePrompt: "tiny shot glass branded ASU surveillance joke product photo",
  },
  {
    id: 6,
    title: "Drinkfles ‘Mistrust’",
    shortDescription:
      "Geborsteld staal, lasergravure: duiven op kabels als printplaat-sporen. BPA-vrij volgens ons — controleer zelf.",
    votes: 12,
    category: "Drank & servies",
    imagePrompt:
      "Hyper detailed brushed stainless steel insulated bottle 750ml product photo, laser etched flock of pigeons on power lines as circuit traces, micro motto Trust No One, matte black rubber ring, condensation droplets, dark marble slab, dramatic side light, visible brushed metal grain macro, luxury water bottle aesthetic",
  },
  {
    id: 7,
    title: "Kurkentrekker ‘Geheime kelder’",
    shortDescription:
      "Voor rode wijn en rode draadjes. Opent ook flessen, naar verluidt.",
    votes: 15,
    category: "Drank & servies",
    imagePrompt: "wine corkscrew premium product photo dark background",
  },
  {
    id: 8,
    title: "T-shirt ‘Ze kijken’",
    shortDescription:
      "Met rugprint voor wie achter zich durft te kijken. Spoiler: er staat een duif.",
    votes: 15,
    category: "Kleding",
    imagePrompt: "t-shirt back print pigeon eyes funny merchandise",
  },
  {
    id: 9,
    title: "Hoodie zwart deluxe",
    shortDescription:
      "Zwart fleece, capuchon met ton-sur-ton duivenveren-jacquard, borstpatch met laserduif. Verberg je identiteit — of je slechte take.",
    votes: 45,
    category: "Kleding",
    imagePrompt:
      "Luxury black heavyweight fleece hoodie flat lay, hood lining tonal jacquard overlapping pigeon feathers subtle antenna threads, chest embroidered pigeon silhouette patch red stitched laser glint eye, gunmetal cord eyelets chunky rib cuffs, triple softbox lighting extreme fleece texture macro, hype streetwear lookbook 8k",
  },
  {
    id: 10,
    title: "Hoodie ‘USB-poort bijna gezien’",
    shortDescription:
      "Warm vanbinnen, koud vanbuiten. Net zoals de relatie met de overheid.",
    votes: 50,
    category: "Kleding",
    imagePrompt: "hoodie with humorous USB pigeon joke print product photo",
  },
  {
    id: 11,
    title: "Snapback pet",
    shortDescription:
      "Rechte klep: handig tegen zon én tegen duiven die te laag vliegen.",
    votes: 25,
    category: "Kleding",
    imagePrompt: "black snapback cap merchandise embroidered pigeon logo",
  },
  {
    id: 12,
    title: "Beanie wintereditie",
    shortDescription:
      "Oren warm, complotten warmer. Past onder een helm van een spotter.",
    votes: 22,
    category: "Kleding",
    imagePrompt: "wool beanie hat dark gray product shot",
  },
  {
    id: 13,
    title: "Sokken ‘pigeon eyes’",
    shortDescription:
      "Zachte stap, harde blik. Combineer met sandalen op eigen risico.",
    votes: 18,
    category: "Kleding",
    imagePrompt: "funny socks pigeon eyes pattern product flat lay",
  },
  {
    id: 14,
    title: "Slippers badkamer",
    shortDescription:
      "Antislip. Want als je uitglijdt, lachen ze — en ‘zij’ horen dat.",
    votes: 20,
    category: "Kleding",
    imagePrompt: "rubber bathroom slippers simple black product photo",
  },
  {
    id: 15,
    title: "Trui feestdagen (limited lie)",
    shortDescription:
      "Rode trui, witte leugens, groene duiven? Iets met kleuren. Feestelijk genoeg.",
    votes: 35,
    category: "Kleding",
    imagePrompt: "ugly christmas sweater style pigeon joke knit pattern",
  },
  {
    id: 16,
    title: "Emaille pin klein",
    shortDescription:
      "Voor op je revers, je rugzak of je ziel. Klein maar verdacht.",
    votes: 8,
    category: "Stickers & papier",
    imagePrompt: "small enamel pin pigeon conspiracy cute product macro",
  },
  {
    id: 17,
    title: "Stickervel A4",
    shortDescription:
      "Mat gelamineerd — of toch niet? Plak het op je laptop en word gevolgd door complimenten.",
    votes: 10,
    category: "Stickers & papier",
    imagePrompt: "sheet of vinyl stickers pigeon memes flat lay",
  },
  {
    id: 18,
    title: "Stickerset ‘Laptop camouflage’",
    shortDescription:
      "Maakt je toestel onleesbaar voor… iemand. Zeker niet voor jezelf, hopelijk.",
    votes: 14,
    category: "Stickers & papier",
    imagePrompt: "laptop covered in funny stickers pigeon theme",
  },
  {
    id: 19,
    title: "Poster WANTED: duif",
    shortDescription:
      "A2-formaat. Hang hem op waar buren het zeker zien. Sociale cohesie gegarandeerd.",
    votes: 25,
    category: "Stickers & papier",
    imagePrompt: "wanted poster parody pigeon illustration wall art",
  },
  {
    id: 20,
    title: "Notitieboek ‘Field notes: dak’",
    shortDescription:
      "Gelijnd papier voor waarnemingen. Eerste regel: ‘Niet te dichtbij komen.’",
    votes: 16,
    category: "Stickers & papier",
    imagePrompt: "notebook field notes style black cover product",
  },
  {
    id: 21,
    title: "Pennenbak ‘USB-poort’",
    shortDescription:
      "Houdt pennen rechtop. Houdt geheimen scheef. Decoratief absurdisme.",
    votes: 30,
    category: "Absurdisme",
    imagePrompt: "desk pen holder shaped like usb port joke office product",
  },
  {
    id: 22,
    title: "Muismat XXL",
    shortDescription:
      "Ruim genoeg voor muis én paranoia. Glad oppervlak, ruwe werkelijkheid.",
    votes: 28,
    category: "Stickers & papier",
    imagePrompt: "extra large mousepad desk mat dark humor pigeon print",
  },
  {
    id: 23,
    title: "Tote bag canvas",
    shortDescription:
      "Voor brood — dat gewoon brood is. Of toch? Boodschappen doen met attitude.",
    votes: 20,
    category: "Kleding",
    imagePrompt: "canvas tote bag merchandise pigeon graphic product",
  },
  {
    id: 24,
    title: "Rugzak mini",
    shortDescription:
      "Canvas mini-rugzak met goudbroodkruimel-borduursel en kleine duif — voor je fles water en je map van vier pagina’s ‘bewijs’.",
    votes: 55,
    category: "Kleding",
    imagePrompt:
      "Compact black waxed canvas mini backpack product shot, gold embroidery trail of bread crumbs to tiny dove on front pocket, zipper pulls like golden crumb nuggets, aged parchment tag faint conspiracy doodles, brass buckles mesh pocket, grey concrete floor crisp key light, streetwear accessory macro 8k",
  },
  {
    id: 25,
    title: "Sleutelhanger silhouet",
    shortDescription:
      "Metaal. Klinkt mysterieus in je broekzak. Is gewoon een sleutelhanger.",
    votes: 12,
    category: "Stickers & papier",
    imagePrompt: "metal keychain pigeon silhouette minimalist product",
  },
  {
    id: 26,
    title: "Telefoonhoesje universeel (theater)",
    shortDescription:
      "Past ‘bijna’ op elke gsm. Net zo universeel als onze theorieën.",
    votes: 38,
    category: "Absurdisme",
    imagePrompt: "phone case generic black humor sticker pigeon",
  },
  {
    id: 27,
    title: "Zonnebril ‘Te dichtbij’",
    shortDescription:
      "Acetaat zwart, gegraveerde tempels met veer- en golfmotief; spiegellens reflecteert mini-duif. UV volgens etiket — twijfel is gezond.",
    votes: 70,
    category: "Kleding",
    imagePrompt:
      "Ultra macro black acetate sunglasses three quarter view, charcoal mirrored lenses reflect miniature pigeons and power lines, laser etched temples feather and radio wave filigree, velvet case corner bokeh, cinematic low key gradient, luxury eyewear campaign hyperdetail 8k",
  },
  {
    id: 28,
    title: "Paraplu zwart",
    shortDescription:
      "Tegen regen, tegen drones? In elk geval tegen nat haar tijdens stake-outs.",
    votes: 32,
    category: "Kleding",
    imagePrompt: "black umbrella product photography minimal",
  },
  {
    id: 29,
    title: "Strandhanddoek",
    shortDescription:
      "Groot genoeg om jezelf te verstoppen als er een duif landt op je picknickmand.",
    votes: 42,
    category: "Kleding",
    imagePrompt: "beach towel pigeon pattern funny product",
  },
  {
    id: 30,
    title: "Kookschort",
    shortDescription:
      "Voor wie kookt met passie en eet met wantrouwen. Vlekken zijn ‘bewijs’.",
    votes: 35,
    category: "Kleding",
    imagePrompt: "kitchen apron black simple typography humor",
  },
  {
    id: 31,
    title: "Ovenwanten set (2)",
    shortDescription:
      "Hittebestendig volgens de mythe. Net als onze hoop op transparantie.",
    votes: 24,
    category: "Drank & servies",
    imagePrompt: "oven mitts pair kitchen product photo",
  },
  {
    id: 32,
    title: "Blikjeskoeler draagbaar",
    shortDescription:
      "Houdt drankjes koud en gesprekken warm. Op eigen risico op het plein.",
    votes: 30,
    category: "Drank & servies",
    imagePrompt: "portable cooler bag cans picnic product",
  },
  {
    id: 33,
    title: "Fluitje ‘niet van een duif’",
    shortDescription:
      "Klinkt scherp. Geschikt om aandacht te trekken — of duiven te irriten.",
    votes: 18,
    category: "Absurdisme",
    imagePrompt: "plastic whistle toy yellow product photo joke",
  },
  {
    id: 34,
    title: "Speelgoedverrekijker",
    shortDescription:
      "Plastic lens, echte intentie. Voor kinderen die vroeg willen ‘wakker’ worden.",
    votes: 45,
    category: "Absurdisme",
    imagePrompt: "toy binoculars plastic colorful product",
  },
  {
    id: 35,
    title: "Walkie-talkie set (nep)",
    shortDescription:
      "Maakt geluiden. Ontvangt vooral uw verbeelding. Top voor rollenspel A.S.U.",
    votes: 50,
    category: "Absurdisme",
    imagePrompt: "toy walkie talkies bright plastic product photo",
  },
  {
    id: 36,
    title: "Anti-duif spray (placebo)",
    shortDescription:
      "Fles met vertrouwen. Inhoud: lucht en dromen. Niet inspruiten in USB-poorten.",
    votes: 22,
    category: "Absurdisme",
    imagePrompt: "spray bottle labeled placebo joke product photo",
  },
  {
    id: 37,
    title: "Broodkruimel-detector (LED-spel)",
    shortDescription:
      "Knippert willekeurig. Bewezen niet-wetenschappelijk. Wel hilarisch op feestjes.",
    votes: 60,
    category: "Absurdisme",
    imagePrompt: "small gadget led blink toy bread crumb joke product",
  },
  {
    id: 38,
    title: "USB-stick vorm duif",
    shortDescription:
      "Opslagcapaciteit: symbolisch. Geschikt om ‘bewijs’ te verplaatsen tussen laptops.",
    votes: 55,
    category: "Absurdisme",
    imagePrompt: "usb flash drive shaped like pigeon cute product",
  },
  {
    id: 39,
    title: "Powerbank met complotsticker",
    shortDescription:
      "10.000 mAh volgens doos. De doos liegt nooit — toch?",
    votes: 90,
    category: "Absurdisme",
    imagePrompt: "power bank black brick sticker pigeon humor product",
  },
  {
    id: 40,
    title: "Drone-jammer (lege doos collector’s)",
    shortDescription:
      "Premium verpakking, minimale inhoud. Conceptuele kunst voor techsceptici.",
    votes: 120,
    category: "Absurdisme",
    imagePrompt: "empty electronics box premium parody product",
  },
  {
    id: 41,
    title: "Diploma ‘Duivenspecialist niveau 1’",
    shortDescription:
      "Geprint op dik papier. Officieel nergens erkend. Emotioneel wél goud waard.",
    votes: 75,
    category: "Stickers & papier",
    imagePrompt: "funny diploma certificate pigeon specialist parody",
  },
  {
    id: 42,
    title: "Spotterhelm (cardboard upgrade)",
    shortDescription:
      "Veiligheid eerst — vooral voor uw ego. Met elastiek en ambitie.",
    votes: 85,
    category: "Absurdisme",
    imagePrompt: "cardboard helmet DIY joke costume product",
  },
  {
    id: 43,
    title: "Reflecterend hesje",
    shortDescription:
      "Zichtbaar voor auto’s, onzichtbaar voor het systeem (niet echt).",
    votes: 48,
    category: "Kleding",
    imagePrompt: "high visibility safety vest product photo",
  },
  {
    id: 44,
    title: "GPS voor broodkruimels (prop)",
    shortDescription:
      "Scherm toont ‘Zoekend…’ voor altijd. Poëtisch, niet praktisch.",
    votes: 95,
    category: "Absurdisme",
    imagePrompt: "toy gps device prop silly product photo",
  },
  {
    id: 45,
    title: "Nachtzichtbril (karton)",
    shortDescription:
      "Beperkt zicht, onbeperkte vibes. Breekbaar — net als complotten.",
    votes: 65,
    category: "Absurdisme",
    imagePrompt: "cardboard night vision goggles craft joke",
  },
  {
    id: 46,
    title: "Megafoon mini",
    shortDescription:
      "Voor korte speeches op het plein. Batterijen: ‘ergens’.",
    votes: 40,
    category: "Absurdisme",
    imagePrompt: "mini megaphone toy red product photography",
  },
  {
    id: 47,
    title: "Laserpointer ‘niet voor katten’",
    shortDescription:
      "Richt nooit op vliegtuigen. Of duiven. Of buren. Of toch?",
    votes: 28,
    category: "Absurdisme",
    imagePrompt: "laser pointer pen product photo warning humor label",
  },
  {
    id: 48,
    title: "Wandklok zonder wijzers",
    shortDescription:
      "Tijd is een illusie. De klok ook. Hangt filosofisch mooi in de woonkamer.",
    votes: 88,
    category: "Absurdisme",
    imagePrompt: "wall clock no hands surreal product photo",
  },
  {
    id: 49,
    title: "Bordspel ‘Project A.S.U.’",
    shortDescription:
      "Dobbelstenen, kaarten, ruzie. Regels bewust vaag — net als echte dossiers.",
    votes: 110,
    category: "Absurdisme",
    imagePrompt: "board game box fictional spy pigeon theme product",
  },
  {
    id: 50,
    title: "Luxe geschenkdoos (inhoud: mysterie)",
    shortDescription:
      "Voelt zwaar. Klinkt hol. Ideaal cadeau voor wie alles al denkt te weten.",
    votes: 150,
    category: "Absurdisme",
    imagePrompt: "luxury gift box closed ribbon mysterious product",
  },
  {
    id: 51,
    title: "VIP-lamineerkaart",
    shortDescription:
      "Glanzend plastic, matige privileges. Wel vooraan in de rij van uw verbeelding.",
    votes: 200,
    category: "Premium / dieren",
    imagePrompt: "laminated vip card prop glossy humorous",
  },
  {
    id: 52,
    title: "Gesigneerde krabbel (echt nep)",
    shortDescription:
      "Uniek kunstwerk. Onduidelijke handtekening. Authenticiteit: emotioneel.",
    votes: 180,
    category: "Premium / dieren",
    imagePrompt: "scribble signature on paper framed joke collectible",
  },
  {
    id: 53,
    title: "Crowdfunding-tegel ‘Top stemmer’",
    shortDescription:
      "Keramische tegel met typfouten. Hangt mooi naast uw diploma’s van niets.",
    votes: 220,
    category: "Premium / dieren",
    imagePrompt: "ceramic tile award humorous text product",
  },
  {
    id: 54,
    title: "Meet & greet met een ‘duif’ (rollenspel)",
    shortDescription:
      "15 minuten spanning. Kostuum kwaliteit: discussieerbaar. Herinnering: onbetaalbaar.",
    votes: 350,
    category: "Premium / dieren",
    imagePrompt: "person in pigeon mascot costume funny event photo",
  },
  {
    id: 55,
    title: "Postduif-koerier met diploma",
    shortDescription:
      "Levendige service. Levert brieven — als de wind mee zit en de duif niet oplaadt.",
    votes: 500,
    category: "Premium / dieren",
    imagePrompt: "carrier pigeon mail bag cinematic realistic bird portrait",
  },
  {
    id: 56,
    title: "Mok ‘Opladen op kabels’",
    shortDescription:
      "Voor wie weet dat elektriciteitsdraden eigenlijk laadstations zijn.",
    votes: 5,
    category: "Drank & servies",
    imagePrompt: "coffee mug power lines graphic funny pigeon charging joke",
  },
  {
    id: 57,
    title: "Sticker ‘Ministerie van Gevederde Zaken’",
    shortDescription:
      "Officieel onofficieel. Plakken op eigen risico — en dat van uw leaseauto.",
    votes: 9,
    category: "Stickers & papier",
    imagePrompt: "government parody seal sticker pigeon ministry humor",
  },
  {
    id: 58,
    title: "Polo premium",
    shortDescription:
      "Piqué zwart met ton-sur-ton duiven en broodkruimels in jacquard, knopen met subtiele pootafdruk. Gemeenteraad overdag, complotborrel ’s avonds.",
    votes: 42,
    category: "Kleding",
    imagePrompt:
      "Mannequin torso black premium cotton pique polo, tonal jacquard flying pigeons and scattered bread crumb dots on chest and sleeves, mother of pearl buttons tiny dove footprints etched, sleeve shield crest patch pigeon laurel wreath, crisp collar soft grey seamless backdrop fashion ecommerce hero 8k",
  },
];

export function getMerchById(id: number): MerchItem | undefined {
  return MERCH_CATALOG.find((item) => item.id === id);
}
