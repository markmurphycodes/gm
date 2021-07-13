class EditorFile {
  constructor(name, data) {
    this.name = name;

    this.file = new File(data, `${name}.c`);

    console.log("SHIT");
  }

  log = () => {
    console.log(this.file);
  };
}

export default EditorFile;
