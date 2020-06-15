import scssParse from 'postcss-scss/lib/scss-parse';

const myCss = `
// WebcamInput

// Variables
// =========

// Selectors

/* dfssdhddj
d
d
d
d
 */

.fullScreenModal.fullScreenModal {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  top: 0 !important;
  width: 100% !important;
  left: 0 !important;
  margin: 0em auto !important;
}

.webcamNeedWidthCompress {
  width: 100%;
}

.webcamAdaptByHeight {
  width: unset;
  height: calc(100vh - 118px);
}

.inputBorder {
  border: 1px solid rgba(34, 36, 38, 0.35) !important;

 // wwww
  &:focus {
/* dfssdhddj */
    border: 1px solid rgba(34, 36, 38, 1) !important;
//    border: 1px solid rgba(34, 36, 38, 1) !important;


  }
}


.modalVideoCentered.modalVideoCentered {
  display: flex !important;
  flex-direction: row !important;
  flex: 1 1 auto !important;
  align-items: center !important;
  justify-content: center !important;
}

.contentNoPaddings.contentNoPaddings {
  padding: 0 !important;
}

.actionButtons {
  padding-top: 4px;
  padding-bottom: 4px;
  display: flex;
  justify-content: flex-end;
}

.modalHeader.modalHeader {
  display: flex !important;
  align-items: center !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

.headerHeight.headerHeight {
  height: 48px !important;
}

// =========

// MediaQueries
@media screen and (min-width: 1201px) {
}

@media screen and (min-width: 994px) and (max-width: 1200px) {
}

@media screen and (min-width: 769px) and (max-width: 993px) {
}

@media screen and (max-width: 768px) {
  .contentNoPaddings.contentNoPaddings {
    padding: 0 !important;
  }

  .rowNoPaddings.rowNoPaddings {
    padding: 0 !important;
  }

  .columnNoPaddings.columnNoPaddings {
    padding: 0 !important;
  }

  .actionButtons {
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    justify-content: center;
  }

  .headerHeight {
    height: unset;
  }
}
// ============
`;

console.log(scssParse(myCss));
