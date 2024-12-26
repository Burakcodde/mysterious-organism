// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randomIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },

    compareDNA(otherPAequor) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          identicalBases++;
        }
      }
      const percentage = ((identicalBases / this.dna.length) * 100).toFixed(2);
      console.log(
        `specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage}% DNA in common`
      );
    },

    willLikelySurvive() {
      let count = 0;
      for (let base of this.dna) {
        if (base === "C" || base === "G") {
          count++;
        }
      }
      const percentage = (count / this.dna.length) * 100;
      return percentage >= 60;
    },
  };
};

const survivingSpecimens = [];
let idCounter = 1;

while (survivingSpecimens.length < 30) {
  const newOrganism = pAequorFactory(idCounter, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    survivingSpecimens.push(newOrganism);
  }
  idCounter++;
}

console.log(survivingSpecimens)
