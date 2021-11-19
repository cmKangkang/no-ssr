const fs = require("fs-extra");
const { series, parallel, src, dest } = require("gulp");
const path = require("path");
const cp = require("child_process");
const babel = require("gulp-babel");
const ts = require("gulp-typescript");
const tsconfig = require('./tsconfig.json')

// 清空目录下文件
function clear(cb) {
  function del(srcs, cb) {
    srcs.forEach((src) => fs.emptyDirSync(src));
    cb();
  }
  del(["dist/", "es/"], cb);
}

// 生成声明文件
function genDTs(cb) {
  function dts(outDir) {
    cp.execSync(
      `npx tsc -p tsconfig.json --emitDeclarationOnly --outDir ${outDir}`,
      {
        cwd: path.resolve(__dirname, ".")
      }
    )
  }
  dts('es')
  dts('dist')
  cb()
  // console.log(tsconfig.compilerOptions)
  // const tsProject = ts({
  //   ...tsconfig.compilerOptions,
  //   "declaration": true,
  //   "emitDeclarationOnly": true
  // });
  // src(["components/**/*.{ts,tsx}"])
  //   .pipe(tsProject)
  //   .pipe(dest("es"))
  //   .pipe(dest("dist"))
  // cb()
}

// 到 es
function dealTsxByTs(cb) {
  const tsconfig = ts.createProject("tsconfig.json");
  tsconfig.src().pipe(tsconfig()).js.pipe(dest("es"));
  cb();
}

// 到 dist
function dealTsxByBabel(cb) {
  src(["./components/**/*.ts", "./components/**/*.tsx"])
    .pipe(
      babel({
        presets: [
          "@babel/react",
          "@babel/preset-typescript",
          "@babel/preset-env",
        ],
      })
    )
    .pipe(dest("dist"));
  cb();
}

// 处理css
function dealCss(cb) {
  src(["./components/**/style/*.css"]).pipe(dest("dist/style"));
  src(["./components/**/style/*.css"]).pipe(dest("es/style"));
  cb();
}

exports.build = series(
  clear,
  parallel(dealTsxByTs, dealTsxByBabel, dealCss),
  genDTs
);
