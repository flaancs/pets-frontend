import { faPython } from "@fortawesome/free-brands-svg-icons";
import {
  faDog,
  faCat,
  faFish,
  faCrow,
  faSpider,
  faFrog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PET_TYPES = [
  { value: "dog", label: "Dog", icon: <FontAwesomeIcon icon={faDog} /> },
  { value: "cat", label: "Cat", icon: <FontAwesomeIcon icon={faCat} /> },
  { value: "fish", label: "Fish", icon: <FontAwesomeIcon icon={faFish} /> },
  { value: "bird", label: "Bird", icon: <FontAwesomeIcon icon={faCrow} /> },
  { value: "snake", label: "Snake", icon: <FontAwesomeIcon icon={faPython} /> },
  { value: "frog", label: "Frog", icon: <FontAwesomeIcon icon={faFrog} /> },
  {
    value: "spider",
    label: "Spider",
    icon: <FontAwesomeIcon icon={faSpider} />,
  },
];

export const PET_BREEDS = [
  { value: "labrador_retriever", label: "Labrador Retriever", pet_type: "dog" },
  { value: "german_shepherd", label: "German Shepherd", pet_type: "dog" },
  { value: "golden_retriever", label: "Golden Retriever", pet_type: "dog" },
  { value: "french_bulldog", label: "French Bulldog", pet_type: "dog" },

  { value: "persian", label: "Persian", pet_type: "cat" },
  { value: "maine_coon", label: "Maine Coon", pet_type: "cat" },
  { value: "siamese", label: "Siamese", pet_type: "cat" },
  { value: "ragdoll", label: "Ragdoll", pet_type: "cat" },

  { value: "goldfish", label: "Goldfish", pet_type: "fish" },
  { value: "betta", label: "Betta", pet_type: "fish" },
  { value: "guppy", label: "Guppy", pet_type: "fish" },
  { value: "angelfish", label: "Angelfish", pet_type: "fish" },

  { value: "parakeet", label: "Parakeet", pet_type: "bird" },
  { value: "canary", label: "Canary", pet_type: "bird" },
  { value: "lovebird", label: "Lovebird", pet_type: "bird" },
  {
    value: "african_grey_parrot",
    label: "African Grey Parrot",
    pet_type: "bird",
  },

  { value: "corn_snake", label: "Corn Snake", pet_type: "snake" },
  { value: "ball_python", label: "Ball Python", pet_type: "snake" },
  { value: "king_snake", label: "King Snake", pet_type: "snake" },
  { value: "boa_constrictor", label: "Boa Constrictor", pet_type: "snake" },

  { value: "dwarf_clawed_frog", label: "Dwarf Clawed Frog", pet_type: "frog" },
  { value: "pacman_frog", label: "Pacman Frog", pet_type: "frog" },
  {
    value: "red_eyed_tree_frog",
    label: "Red-Eyed Tree Frog",
    pet_type: "frog",
  },
  { value: "african_bullfrog", label: "African Bullfrog", pet_type: "frog" },

  { value: "tarantula", label: "Tarantula", pet_type: "spider" },
  { value: "jumping_spider", label: "Jumping Spider", pet_type: "spider" },
  { value: "wolf_spider", label: "Wolf Spider", pet_type: "spider" },
  {
    value: "orb_weaver_spider",
    label: "Orb Weaver Spider",
    pet_type: "spider",
  },
];

export const TYPE_TABS: Record<number, string> = {
  0: "all",
  1: "dog",
  2: "cat",
  3: "fish",
  4: "bird",
  5: "snake",
  6: "frog",
  7: "spider",
};
