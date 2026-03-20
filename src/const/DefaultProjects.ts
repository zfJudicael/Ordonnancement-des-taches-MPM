import { Project, type TaskModel } from "@/models/Project";

//Construction d'un nouvel entrepôt
export const TableEntrepot = new Map<string, TaskModel>([
    ["A", 
        { id: "A", name: "Etudes et calculs des besoins en composants et matières", duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }
    ],
    ["B", 
        { id: "B", name: "Installation du chantier", duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }
    ],
    ["C", 
        { id: "C", name: "Caractéristiques des commandes", duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }
    ],
    ["D", 
        { id: "D", name: "Appel d'offre pour l'ensemble des composants", duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A","B"], nextTasks: [] }
    ],
    ["E", 
        { id: "E", name: "Choix des fournisseurs et intervenants", duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }
    ],
    ["F", 
        { id: "F", name: "Livraison des matériaux", duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C"], nextTasks: [] }
    ],
    ["G", 
        { id: "G", name: "Coulage des fondations", duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["D", "F"], nextTasks: [] }
    ],
    ["H", 
        { id: "H", name: "Délai de livraison des autres composants", duration: 10, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E"], nextTasks: [] }
    ],
    ["I", 
        { id: "I", name: "Construction ", duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["G"], nextTasks: [] }
    ],
    ["J", 
        { id: "J", name: "Mise en route de l'ensemble", duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "I"], nextTasks: [] }
    ],
])

const Example = new Project(
    "Exemple01",
    "Construction d'un nouvel entrepôt",
    TableEntrepot
)

export {
    Example
}

