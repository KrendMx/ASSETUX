import path from "path"

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`

const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand]
}

export default config
