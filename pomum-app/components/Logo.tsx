// Pomum-logoen. Filene ligger i mappen public/:
//   logo.svg          – mørk tekst (brukes på lys bakgrunn)
//   logo-lys.svg      – lys tekst (brukes i footeren)
//   logo-pure-yum.svg – stor versjon med «Pure Yum»
// Vil du bytte logo, last opp nye filer med samme navn i public/.
export function Logo({ light = false, height = 26 }: { light?: boolean; height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? "/logo-lys.svg" : "/logo.svg"}
      alt="Pomum"
      height={height}
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
