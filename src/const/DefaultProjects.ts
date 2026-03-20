import { Project, type TaskModel } from "@/models/Project";

export const Table1 = new Map<string, TaskModel>([
  ["a", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: [], nextTasks: [] }],
  ["b", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: ["a"], nextTasks: [] }],
  ["c", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: ["b"], nextTasks: [] }],
  ["d", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["c"], nextTasks: [] }],
  ["e", { duration: 45, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["d"], nextTasks: [] }],
  ["f", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["e"], nextTasks: [] }],
  ["g", { duration: 45, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["d"], nextTasks: [] }],
  ["h", { duration: 60, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["d"], nextTasks: [] }],
  ["i", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["h"], nextTasks: [] }],
  ["j", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["i"], nextTasks: [] }],
  ["k", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["f"], nextTasks: [] }],
  ["l", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["k"], nextTasks: [] }],
  ["m", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["g", "j", "l"], nextTasks: [] }],
  ["n", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["m"], nextTasks: [] }],
  ["o", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["n"], nextTasks: [] }],
  ["p", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["m"], nextTasks: [] }],
  ["q", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["o"], nextTasks: [] }],
  ["r", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["q"], nextTasks: [] }],
  ["s", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["q"], nextTasks: [] }],
  ["t", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["p"], nextTasks: [] }],
  ["u", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["r", "t"], nextTasks: [] }],
  ["v", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["s", "t"], nextTasks: [] }],
  ["w", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["r", "s"], nextTasks: [] }],
]);

export const Table2 = new Map<string, TaskModel>([
    ["A", { duration: 6, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: ["P"], nextTasks: [] }],
    ["B", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["G"], nextTasks: [] }],
    ["C", { duration: 6, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["K"], nextTasks: [] }],
    ["D", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["N"], nextTasks: [] }],
    ["E", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["K"], nextTasks: [] }],
    ["F", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "J"], nextTasks: [] }],
    ["G", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["H", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "G"], nextTasks: [] }],
    ["I", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["M", "J"], nextTasks: [] }],
    ["J", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "E", "G"], nextTasks: [] }],
    ["K", { duration: 5, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["L", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["O", "Q"], nextTasks: [] }],
    ["M", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B", "C"], nextTasks: [] }],
    ["N", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["I"], nextTasks: [] }],
    ["O", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A", "F", "I"], nextTasks: [] }],
    ["P", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "N"], nextTasks: [] }],
    ["Q", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
])

export const Table3 = new Map<string, TaskModel>([
    ["A", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: [], nextTasks: [] }],
    ["B", { duration: 12, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["C", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["D", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["E", { duration: 16, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["F", { duration: 24, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["G", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }],
    ["H", { duration: 16, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["I", { duration: 12, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }],
    ["J", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["K", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "I", "J"], nextTasks: [] }],
    ["L", { duration: 24, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "I", "J"], nextTasks: [] }],
])

export const Table4 = new Map<string, TaskModel>([
    ["A", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: [], nextTasks: [] }],
    ["B", { duration: 12, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["C", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["D", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["E", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["F", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["G", { duration: 24, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }],
    ["H", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["I", { duration: 12, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }],
    ["J", { duration: 16, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["K", { duration: 32, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["I", "H"], nextTasks: [] }],
    ["L", { duration: 36, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["I", "H", "J"], nextTasks: [] }],
])

export const TableEvent = new Map<string, TaskModel>([
    ["A", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["B", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["C", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["D", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["E", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["D"], nextTasks: [] }],
    ["F", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C"], nextTasks: [] }],
    ["G", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C"], nextTasks: [] }],
    ["H", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C"], nextTasks: [] }],
    ["I", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["J", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E"], nextTasks: [] }],
    ["K", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["G"], nextTasks: [] }],
    ["L", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["F"], nextTasks: [] }],
    ["M", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["J", "K"], nextTasks: [] }],
    ["N", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["M", "L"], nextTasks: [] }],
]);

export const TableEvent10 = new Map<string, TaskModel>([
    ["A", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }], 
    // Définir budget
    ["B", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }], 
    // Choisir date
    ["C", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }], 
    // Faire liste invités
    ["D", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C"], nextTasks: [] }], 
    // Envoyer invitations
    ["E", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }], 
    // Réserver lieu
    ["F", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E"], nextTasks: [] }], 
    // Traiteur & décoration
    ["G", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["D", "F"], nextTasks: [] }], 
    // Logistique et transport
    ["H", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["F"], nextTasks: [] }], 
    // Installation sur lieu
    ["I", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["G", "H"], nextTasks: [] }], 
    // Vérifications finales
    ["J", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["I"], nextTasks: [] }], 
    // Événement / Jour J
]);

export const TableVoyage10 = new Map<string, TaskModel>([
    ["A", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }], // Choisir destination
    ["B", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }], // Définir budget
    ["C", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }], // Réserver transport (avion, train)
    ["D", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }], // Réserver hébergement
    ["E", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }], // Préparer itinéraire
    ["F", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E"], nextTasks: [] }], // Vérifier passeports / visas
    ["G", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E"], nextTasks: [] }], // Souscrire assurance voyage
    ["H", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["F", "G"], nextTasks: [] }], // Faire valises / achats nécessaires
    ["I", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H"], nextTasks: [] }], // Vérification finale
    ["J", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["I"], nextTasks: [] }], // Départ / Voyage
]);

//Construction d'un nouvel entrepôt
export const TableEntrepot = new Map<string, TaskModel>([
    ["A", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    // Etudes et calculs des besoins en composants et matières
    ["B", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    // Installation du chantier
    ["C", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    // Caractéristiques des commandes 
    ["D", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A","B"], nextTasks: [] }],
    // Appel d'offre pour l'ensemble des composants
    ["E", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    // Choix des fournisseurs et intervenants
    ["F", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C"], nextTasks: [] }],
    // Livraison des matériaux
    ["G", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["D", "F"], nextTasks: [] }],
    // Coulage des fondations
    ["H", { duration: 10, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E"], nextTasks: [] }],
    // Délai de livraison des autres composants
    ["I", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["G"], nextTasks: [] }],
    // Construction 
    ["J", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "I"], nextTasks: [] }],
    // Mise en route de l'ensemble
])

const DefaultTable1 = new Project(
    "Exemple01",
    "",
    Table1
)

const DefaultTable2 = new Project(
    "Exemple02",
    "",
    Table2
)

const DefaultTable3 = new Project(
    "Exemple03",
    "",
    Table3
)

const DefaultTable4 = new Project(
    "Exemple04",
    "Mise en exploitation d'un nouveau gisement minier ",
    Table4
)

const DefaultTable5 = new Project(
    "Exemple01",
    "Construction d'un nouvel entrepôt",
    TableEntrepot
)

export {
    DefaultTable1,
    DefaultTable2,
    DefaultTable3,
    DefaultTable4,
    DefaultTable5
}

