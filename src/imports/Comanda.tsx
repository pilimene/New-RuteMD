import svgPaths from "./svg-79j73c1x26";
import imgRectangle6 from "figma:asset/efa08d3efe27d7b6c4af6e74f509e93eedbbb850.png";
import imgPhoto1 from "figma:asset/8ab0ac154724d7a7db1bd6f0f1509b6e4385c36b.png";
import imgPhoto2 from "figma:asset/b18185243268eb818aabe5c1d596d6c6d3042822.png";
import imgPhoto3 from "figma:asset/0ee661c7e5fdf7747d4d4a2d6c1bacce8db1885c.png";
import imgPhoto4 from "figma:asset/2cf50fc80203b63037f4f1eef0f8f2dafd77bd03.png";
import imgPhoto5 from "figma:asset/2fde88645ae478aa5259bda97630370e2beed874.png";
import { imgPhoto } from "./svg-nynf6";

function Group() {
  return (
    <div className="content-stretch flex font-['Outfit:Regular',sans-serif] font-normal gap-[40px] h-[41px] items-center justify-center leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap w-[758px] whitespace-pre">
      <p className="relative shrink-0">Moldova - Turcia</p>
      <p className="relative shrink-0">Inchirieri autocare</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#3870db] content-stretch flex gap-[10px] h-[34px] items-center justify-center relative rounded-[5px] shrink-0 w-[170px]" data-name="button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Contacteaza-ne</p>
    </div>
  );
}

function Heder() {
  return (
    <div className="absolute bottom-[97.88%] box-border content-stretch flex gap-[54px] items-center justify-center left-0 px-[130px] py-0 right-0 top-0" data-name="Heder">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.46)] border-solid bottom-[-1px] left-0 pointer-events-none right-0 top-0" />
      <div className="h-[68px] relative shrink-0 w-[89px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgRectangle6} />
      </div>
      <Group />
      <Button />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-[#1d1f1e] w-full" data-name="Header">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap tracking-[-0.056px] whitespace-pre">Inchirieri autocare</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[90px] relative shrink-0 text-[90px] tracking-[-4.5px] w-[1188px]">Transport la comanda disponibil pentru curse ocazionale</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[335px] items-start relative shrink-0 w-[1188px]" data-name="Text">
      <Header />
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[#646a69] text-[18px] w-[1155px] whitespace-pre-wrap">{`Transport internaţional pe bază de comandă sau contract, de tip: excursii cu grupuri organizate, deplasări şi cantonamente pentru sportivi, conferinţe, târguri, spectacole, sărbători, transport pentru angajaţii unor fabrici sau societăţi din  din ţară.`}</p>
    </div>
  );
}

function ContentWrapper() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[71px] h-[324px] items-start left-[143px] top-[134px] w-[1188px]" data-name="Content-Wrapper">
      <Text />
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute contents left-[143px] top-[134px]" data-name="Header">
      <ContentWrapper />
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[20px] h-[354px] items-start relative shrink-0 w-[592px]" data-name="Text-Wrapper">
      <p className="h-[255px] leading-[68px] relative shrink-0 text-[#1c3549] text-[62px] tracking-[-1.86px] w-full">Contacteaza-ne</p>
      <p className="leading-[26px] relative shrink-0 text-[#1c3549] text-[48px] tracking-[-0.192px] w-full">mdrute@gmail.com</p>
      <p className="leading-[26px] relative shrink-0 text-[#646a69] text-[18px] tracking-[-0.072px] w-full">Chisinau, blvd. Negruzzi 7, of.203, Hotelul Chisinau</p>
    </div>
  );
}

function Stats() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0" data-name="Stats">
      <p className="leading-[60px] relative shrink-0 text-[#1c3549] text-[48px] tracking-[-1.44px] w-full">+373 68 112811</p>
      <p className="leading-[26px] relative shrink-0 text-[#646a69] text-[18px] tracking-[-0.072px] w-full">Dispoibil pe Viber si WhatApp</p>
    </div>
  );
}

function Stats1() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0" data-name="Stats">
      <p className="leading-[60px] relative shrink-0 text-[#1c3549] text-[48px] tracking-[-1.44px] w-full">+373 69 101912</p>
      <p className="leading-[26px] relative shrink-0 text-[#646a69] text-[18px] tracking-[-0.072px] w-full">Dispoibil pe Viber si WhatApp</p>
    </div>
  );
}

function Stats2() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0" data-name="Stats">
      <p className="leading-[60px] relative shrink-0 text-[#1c3549] text-[48px] tracking-[-1.44px] w-full">+90 5151548641</p>
      <p className="leading-[26px] relative shrink-0 text-[#646a69] text-[18px] tracking-[-0.072px] w-full">Dispoibil pe Viber si WhatApp</p>
    </div>
  );
}

function Stats3() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-[384px]" data-name="Stats">
      <Stats />
      <Stats1 />
      <Stats2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[240px] items-start relative shrink-0 w-[1216px]" data-name="Container">
      <TextWrapper />
      <Stats3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[56px] h-[504px] items-start left-[calc(50%-3px)] pb-[104px] pt-[64px] px-[96px] rounded-[10px] top-[16px] translate-x-[-50%] w-[1408px]" data-name="Container">
      <Container />
    </div>
  );
}

function About() {
  return (
    <div className="absolute h-[538px] left-1/2 overflow-clip top-[3671px] translate-x-[-50%] w-[1440px]" data-name="About #2">
      <Container1 />
      <div className="absolute flex h-0 items-center justify-center left-[112px] top-[151px] w-[434px]">
        <div className="flex-none rotate-[180deg]">
          <div className="h-0 relative w-[434px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 434 2">
                <line id="Line 42" stroke="var(--stroke-0, #3870DB)" strokeWidth="2" x2="434" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[62px] top-[341px]" data-name="Text Button">
      <div className="flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3870db] text-[18px] text-center text-nowrap tracking-[-0.072px]">
        <p className="leading-[24px] whitespace-pre">Vezi mai multe poze</p>
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="absolute contents left-0 top-[76px]" data-name="Progress Bar">
      <div className="absolute bg-[#d9dedd] h-[2px] left-0 top-[76px] w-[488px]" data-name="Background" />
      <div className="absolute bg-[#1d1f1e] h-[2px] left-0 top-[76px] w-[278.195px]" data-name="Loading" />
    </div>
  );
}

function Tab() {
  return (
    <div className="absolute h-[78px] left-0 top-[49px] w-[488px]" data-name="Tab">
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal leading-[60px] left-0 text-[#1d1f1e] text-[48px] top-0 tracking-[-1.44px] w-[488px]">Mercedes Tourismo</p>
      <ProgressBar />
    </div>
  );
}

function Active() {
  return (
    <div className="absolute h-[228px] left-0 top-0 w-[488px]" data-name="Active">
      <Tab />
    </div>
  );
}

function Tabs() {
  return (
    <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Tabs">
      <Active />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Medium',sans-serif] font-medium gap-[25px] h-[115px] items-center relative shrink-0 text-center w-[100px]">
      <div className="flex flex-col h-[41px] justify-center leading-[0] relative shrink-0 text-[#012141] text-[50px] tracking-[-0.2px] w-[82px]">
        <p className="leading-[24px]">53</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[20px] text-black tracking-[-0.08px] w-[109px]">locuri psageri</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <div className="h-[47px] relative shrink-0 w-[49px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 47">
          <path d={svgPaths.p1ca9b700} fill="var(--fill-0, #012141)" id="Vector" />
        </svg>
      </div>
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">scaune reglabile</p>
    </div>
  );
}

function MaterialSymbolsAcUnit() {
  return (
    <div className="h-[48px] relative shrink-0 w-[47px]" data-name="material-symbols:ac-unit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 48">
        <g id="material-symbols:ac-unit">
          <path d={svgPaths.p47bcdc0} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <MaterialSymbolsAcUnit />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function IcBaselineLiveTv() {
  return (
    <div className="h-[51px] relative shrink-0 w-[49px]" data-name="ic:baseline-live-tv">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 51">
        <g id="ic:baseline-live-tv">
          <path d={svgPaths.p9b70b80} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <IcBaselineLiveTv />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function Logos() {
  return (
    <div className="absolute content-stretch flex gap-[54px] h-[142px] items-start left-[62px] top-[calc(50%+32.5px)] translate-y-[-50%] w-[666px]" data-name="Logos">
      <Frame1 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function ContentWrapper1() {
  return (
    <div className="absolute h-[421px] left-[-62px] top-0 w-[747px]" data-name="Content-Wrapper">
      <TextButton />
      <Tabs />
      <Logos />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[373px] left-1/2 top-[calc(50%-23.5px)] translate-x-[-50%] translate-y-[-50%] w-[1048px]" data-name="Container">
      <ContentWrapper1 />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute contents left-[calc(66.67%-22.74px)] top-[10.76px]" data-name="Image">
      <div className="absolute flex h-[616px] items-center justify-center left-[calc(58.33%+19.5px)] top-[-100px] w-[547px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[616px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[55.256px_110.758px] mask-size-[401.49px_401.49px] relative w-[547px]" data-name="Photo" style={{ maskImage: `url('${imgPhoto}')` }}>
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgPhoto1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute contents left-[calc(66.67%-34px)] top-[-0.5px]" data-name="Image">
      <div className="absolute bg-[#012141] left-[calc(66.67%-34px)] rounded-[12px] size-[424.004px] top-[-0.5px]" data-name="Background" />
      <Image />
    </div>
  );
}

function Features() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[420px] ml-[44px] mt-[82px] overflow-clip relative rounded-[40px] w-[1170px]" data-name="Features #3">
      <Container2 />
      <Image1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Outfit:Black',sans-serif] font-black leading-[normal] ml-0 mt-0 relative text-[#3870db] text-[200px] w-[81px]">1</p>
      <Features />
    </div>
  );
}

function Active1() {
  return <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Active" />;
}

function Tabs1() {
  return (
    <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Tabs">
      <Active1 />
    </div>
  );
}

function ContentWrapper2() {
  return (
    <div className="absolute h-[421px] left-[229px] top-0 w-[747px]" data-name="Content-Wrapper">
      <Tabs1 />
    </div>
  );
}

function ProgressBar1() {
  return (
    <div className="absolute contents left-0 top-[76px]" data-name="Progress Bar">
      <div className="absolute flex h-[2px] items-center justify-center left-0 top-[76px] w-[488px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#d9dedd] h-[2px] w-[488px]" data-name="Background" />
        </div>
      </div>
      <div className="absolute flex h-[2px] items-center justify-center left-[209.81px] top-[76px] w-[278.195px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#1d1f1e] h-[2px] w-[278.195px]" data-name="Loading" />
        </div>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="h-[78px] relative shrink-0 w-[488px]" data-name="Tab">
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal leading-[60px] right-[183px] text-[#1d1f1e] text-[48px] text-nowrap top-[calc(50%-30px)] tracking-[-1.44px] translate-x-[100%] whitespace-pre">Setra 513</p>
      <ProgressBar1 />
    </div>
  );
}

function IcBaselineLiveTv1() {
  return (
    <div className="h-[51px] relative shrink-0 w-[49px]" data-name="ic:baseline-live-tv">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 51">
        <g id="ic:baseline-live-tv">
          <path d={svgPaths.p9b70b80} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <IcBaselineLiveTv1 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function MaterialSymbolsAcUnit1() {
  return (
    <div className="h-[48px] relative shrink-0 w-[47px]" data-name="material-symbols:ac-unit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 48">
        <g id="material-symbols:ac-unit">
          <path d={svgPaths.p47bcdc0} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <MaterialSymbolsAcUnit1 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[47px] relative w-[49px]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 47">
              <path d={svgPaths.p1ca9b700} fill="var(--fill-0, #012141)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">scaune reglabile</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Medium',sans-serif] font-medium gap-[25px] h-[115px] items-center relative shrink-0 text-center w-[100px]">
      <div className="flex flex-col h-[41px] justify-center leading-[0] relative shrink-0 text-[#012141] text-[50px] tracking-[-0.2px] w-[82px]">
        <p className="leading-[24px]">53</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[20px] text-black tracking-[-0.08px] w-[109px]">locuri psageri</p>
    </div>
  );
}

function Logos1() {
  return (
    <div className="content-stretch flex gap-[54px] h-[115px] items-start justify-end relative shrink-0 w-[666px]" data-name="Logos">
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame2 />
    </div>
  );
}

function TextButton1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text Button">
      <div className="flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3870db] text-[18px] text-center text-nowrap tracking-[-0.072px]">
        <p className="leading-[24px] whitespace-pre">Vezi mai multe poze</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[47px] h-[421px] items-end left-[229px] px-[60px] py-[40px] top-0 w-[747px]">
      <Tab1 />
      <Logos1 />
      <TextButton1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[373px] left-[calc(62.5%-20.75px)] top-[calc(50%-23.5px)] translate-x-[-50%] translate-y-[-50%] w-[1031px]" data-name="Container">
      <ContentWrapper2 />
      <Frame />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute contents left-[11.26px] top-[9.26px]" data-name="Image">
      <div className="absolute h-[727px] left-[-77px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[88.256px_176.758px] mask-size-[401.49px_401.49px] top-[-167.5px] w-[645px]" data-name="Photo" style={{ maskImage: `url('${imgPhoto}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgPhoto2} />
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute contents left-0 top-1/2 translate-y-[-50%]" data-name="Image">
      <div className="absolute bg-[#012141] left-0 rounded-[12px] size-[424.004px] top-[-2px]" data-name="Background" />
      <Image2 />
    </div>
  );
}

function Features1() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[420px] ml-0 mt-[105px] overflow-clip relative rounded-[40px] w-[1170px]" data-name="Features #3">
      <Container3 />
      <Image3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Outfit:Black',sans-serif] font-black leading-[normal] ml-[1244.68px] mt-0 relative text-[#3870db] text-[200px] text-nowrap text-right translate-x-[-100%] whitespace-pre">2</p>
      <Features1 />
    </div>
  );
}

function TextButton2() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[62px] top-[341px]" data-name="Text Button">
      <div className="flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3870db] text-[18px] text-center text-nowrap tracking-[-0.072px]">
        <p className="leading-[24px] whitespace-pre">Vezi mai multe poze</p>
      </div>
    </div>
  );
}

function ProgressBar2() {
  return (
    <div className="absolute contents left-0 top-[76px]" data-name="Progress Bar">
      <div className="absolute bg-[#d9dedd] h-[2px] left-0 top-[76px] w-[488px]" data-name="Background" />
      <div className="absolute bg-[#1d1f1e] h-[2px] left-0 top-[76px] w-[278.195px]" data-name="Loading" />
    </div>
  );
}

function Tab2() {
  return (
    <div className="absolute h-[78px] left-0 top-[49px] w-[488px]" data-name="Tab">
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal leading-[60px] left-0 text-[#1d1f1e] text-[48px] top-0 tracking-[-1.44px] w-[488px]">Setra 613</p>
      <ProgressBar2 />
    </div>
  );
}

function Active2() {
  return (
    <div className="absolute h-[228px] left-0 top-0 w-[488px]" data-name="Active">
      <Tab2 />
    </div>
  );
}

function Tabs2() {
  return (
    <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Tabs">
      <Active2 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Medium',sans-serif] font-medium gap-[25px] h-[115px] items-center relative shrink-0 text-center w-[100px]">
      <div className="flex flex-col h-[41px] justify-center leading-[0] relative shrink-0 text-[#012141] text-[50px] tracking-[-0.2px] w-[82px]">
        <p className="leading-[24px]">55</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[20px] text-black tracking-[-0.08px] w-[109px]">locuri psageri</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <div className="h-[47px] relative shrink-0 w-[49px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 47">
          <path d={svgPaths.p1ca9b700} fill="var(--fill-0, #012141)" id="Vector" />
        </svg>
      </div>
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">scaune reglabile</p>
    </div>
  );
}

function MaterialSymbolsAcUnit2() {
  return (
    <div className="h-[48px] relative shrink-0 w-[47px]" data-name="material-symbols:ac-unit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 48">
        <g id="material-symbols:ac-unit">
          <path d={svgPaths.p47bcdc0} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <MaterialSymbolsAcUnit2 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function IcBaselineLiveTv2() {
  return (
    <div className="h-[51px] relative shrink-0 w-[49px]" data-name="ic:baseline-live-tv">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 51">
        <g id="ic:baseline-live-tv">
          <path d={svgPaths.p9b70b80} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <IcBaselineLiveTv2 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function Logos2() {
  return (
    <div className="absolute content-stretch flex gap-[54px] h-[142px] items-start left-[62px] top-[calc(50%+32.5px)] translate-y-[-50%] w-[666px]" data-name="Logos">
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function ContentWrapper3() {
  return (
    <div className="absolute h-[421px] left-[-62px] top-0 w-[747px]" data-name="Content-Wrapper">
      <TextButton2 />
      <Tabs2 />
      <Logos2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[373px] left-1/2 top-[calc(50%-23.5px)] translate-x-[-50%] translate-y-[-50%] w-[1048px]" data-name="Container">
      <ContentWrapper3 />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute contents left-[calc(66.67%-22.74px)] top-[10.76px]" data-name="Image">
      <div className="absolute flex h-[630px] items-center justify-center left-[calc(66.67%-34px)] top-[-122px] w-[559px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[630px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[11.256px_132.758px] mask-size-[401.49px_401.49px] relative w-[559px]" data-name="Photo" style={{ maskImage: `url('${imgPhoto}')` }}>
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgPhoto3} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute contents left-[calc(66.67%-34px)] top-[-0.5px]" data-name="Image">
      <div className="absolute bg-[#012141] left-[calc(66.67%-34px)] rounded-[12px] size-[424.004px] top-[-0.5px]" data-name="Background" />
      <Image4 />
    </div>
  );
}

function Features2() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[420px] ml-[64px] mt-[104px] overflow-clip relative rounded-[40px] w-[1170px]" data-name="Features #3">
      <Container4 />
      <Image5 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Outfit:Black',sans-serif] font-black leading-[normal] ml-[116px] mt-0 relative text-[#3870db] text-[200px] text-nowrap text-right translate-x-[-100%] whitespace-pre">3</p>
      <Features2 />
    </div>
  );
}

function Active3() {
  return <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Active" />;
}

function Tabs3() {
  return (
    <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Tabs">
      <Active3 />
    </div>
  );
}

function ContentWrapper4() {
  return (
    <div className="absolute h-[421px] left-[229px] top-0 w-[747px]" data-name="Content-Wrapper">
      <Tabs3 />
    </div>
  );
}

function ProgressBar3() {
  return (
    <div className="absolute contents left-0 top-[76px]" data-name="Progress Bar">
      <div className="absolute flex h-[2px] items-center justify-center left-0 top-[76px] w-[488px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#d9dedd] h-[2px] w-[488px]" data-name="Background" />
        </div>
      </div>
      <div className="absolute flex h-[2px] items-center justify-center left-[209.81px] top-[76px] w-[278.195px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#1d1f1e] h-[2px] w-[278.195px]" data-name="Loading" />
        </div>
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div className="h-[78px] relative shrink-0 w-[488px]" data-name="Tab">
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal leading-[60px] right-[183px] text-[#1d1f1e] text-[48px] text-nowrap top-[calc(50%-30px)] tracking-[-1.44px] translate-x-[100%] whitespace-pre">Setra 513</p>
      <ProgressBar3 />
    </div>
  );
}

function IcBaselineLiveTv3() {
  return (
    <div className="h-[51px] relative shrink-0 w-[49px]" data-name="ic:baseline-live-tv">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 51">
        <g id="ic:baseline-live-tv">
          <path d={svgPaths.p9b70b80} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <IcBaselineLiveTv3 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function MaterialSymbolsAcUnit3() {
  return (
    <div className="h-[48px] relative shrink-0 w-[47px]" data-name="material-symbols:ac-unit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 48">
        <g id="material-symbols:ac-unit">
          <path d={svgPaths.p47bcdc0} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <MaterialSymbolsAcUnit3 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[47px] relative w-[49px]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 47">
              <path d={svgPaths.p1ca9b700} fill="var(--fill-0, #012141)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">scaune reglabile</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Medium',sans-serif] font-medium gap-[25px] h-[115px] items-center relative shrink-0 text-center w-[100px]">
      <div className="flex flex-col h-[41px] justify-center leading-[0] relative shrink-0 text-[#012141] text-[50px] tracking-[-0.2px] w-[82px]">
        <p className="leading-[24px]">51</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[20px] text-black tracking-[-0.08px] w-[109px]">locuri psageri</p>
    </div>
  );
}

function Logos3() {
  return (
    <div className="content-stretch flex gap-[54px] h-[115px] items-start justify-end relative shrink-0 w-[666px]" data-name="Logos">
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
    </div>
  );
}

function TextButton3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text Button">
      <div className="flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3870db] text-[18px] text-center text-nowrap tracking-[-0.072px]">
        <p className="leading-[24px] whitespace-pre">Vezi mai multe poze</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[47px] h-[421px] items-end left-[229px] px-[60px] py-[40px] top-0 w-[747px]">
      <Tab3 />
      <Logos3 />
      <TextButton3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[373px] left-[calc(62.5%-20.75px)] top-[calc(50%-23.5px)] translate-x-[-50%] translate-y-[-50%] w-[1031px]" data-name="Container">
      <ContentWrapper4 />
      <Frame17 />
    </div>
  );
}

function Image6() {
  return (
    <div className="absolute contents left-[11.26px] top-[9.26px]" data-name="Image">
      <div className="absolute h-[727px] left-[9px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2.26px_142.256px] mask-size-[401.49px_401.49px] top-[-133px] w-[645px]" data-name="Photo" style={{ maskImage: `url('${imgPhoto}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgPhoto4} />
      </div>
    </div>
  );
}

function Image7() {
  return (
    <div className="absolute contents left-0 top-1/2 translate-y-[-50%]" data-name="Image">
      <div className="absolute bg-[#012141] left-0 rounded-[12px] size-[424.004px] top-[-2px]" data-name="Background" />
      <Image6 />
    </div>
  );
}

function Features3() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[420px] ml-0 mt-[116px] overflow-clip relative rounded-[40px] w-[1170px]" data-name="Features #3">
      <Container5 />
      <Image7 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <p className="[grid-area:1_/_1] font-['Outfit:Black',sans-serif] font-black leading-[normal] ml-[1230px] mt-0 relative text-[#3870db] text-[200px] text-nowrap text-right translate-x-[-100%] whitespace-pre">4</p>
      <Features3 />
    </div>
  );
}

function TextButton4() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[62px] top-[341px]" data-name="Text Button">
      <div className="flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#3870db] text-[18px] text-center text-nowrap tracking-[-0.072px]">
        <p className="leading-[24px] whitespace-pre">Vezi mai multe poze</p>
      </div>
    </div>
  );
}

function ProgressBar4() {
  return (
    <div className="absolute contents left-0 top-[76px]" data-name="Progress Bar">
      <div className="absolute bg-[#d9dedd] h-[2px] left-0 top-[76px] w-[488px]" data-name="Background" />
      <div className="absolute bg-[#1d1f1e] h-[2px] left-0 top-[76px] w-[278.195px]" data-name="Loading" />
    </div>
  );
}

function Tab4() {
  return (
    <div className="absolute h-[78px] left-0 top-[49px] w-[488px]" data-name="Tab">
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal leading-[60px] left-0 text-[#1d1f1e] text-[48px] top-0 tracking-[-1.44px] w-[488px]">Mercedes Sprinter</p>
      <ProgressBar4 />
    </div>
  );
}

function Active4() {
  return (
    <div className="absolute h-[228px] left-0 top-0 w-[488px]" data-name="Active">
      <Tab4 />
    </div>
  );
}

function Tabs4() {
  return (
    <div className="absolute h-[228px] left-[62px] top-0 w-[488px]" data-name="Tabs">
      <Active4 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Medium',sans-serif] font-medium gap-[25px] h-[115px] items-center relative shrink-0 text-center w-[100px]">
      <div className="flex flex-col h-[41px] justify-center leading-[0] relative shrink-0 text-[#012141] text-[50px] tracking-[-0.2px] w-[82px]">
        <p className="leading-[24px]">20</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[20px] text-black tracking-[-0.08px] w-[109px]">locuri psageri</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <div className="h-[47px] relative shrink-0 w-[49px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 47">
          <path d={svgPaths.p1ca9b700} fill="var(--fill-0, #012141)" id="Vector" />
        </svg>
      </div>
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">scaune reglabile</p>
    </div>
  );
}

function MaterialSymbolsAcUnit4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[47px]" data-name="material-symbols:ac-unit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 48">
        <g id="material-symbols:ac-unit">
          <path d={svgPaths.p47bcdc0} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <MaterialSymbolsAcUnit4 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function IcBaselineLiveTv4() {
  return (
    <div className="h-[51px] relative shrink-0 w-[49px]" data-name="ic:baseline-live-tv">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49 51">
        <g id="ic:baseline-live-tv">
          <path d={svgPaths.p9b70b80} fill="var(--fill-0, #012141)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-full items-center relative shrink-0 w-[100px]">
      <IcBaselineLiveTv4 />
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[20px] text-black text-center tracking-[-0.08px] w-[109px]">aer conditionat</p>
    </div>
  );
}

function Logos4() {
  return (
    <div className="absolute content-stretch flex gap-[54px] h-[142px] items-start left-[62px] top-[calc(50%+32.5px)] translate-y-[-50%] w-[666px]" data-name="Logos">
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function ContentWrapper5() {
  return (
    <div className="absolute h-[421px] left-[-62px] top-0 w-[747px]" data-name="Content-Wrapper">
      <TextButton4 />
      <Tabs4 />
      <Logos4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[373px] left-1/2 top-[calc(50%-23.5px)] translate-x-[-50%] translate-y-[-50%] w-[1048px]" data-name="Container">
      <ContentWrapper5 />
    </div>
  );
}

function Image8() {
  return (
    <div className="absolute contents left-[calc(66.67%-22.74px)] top-[10.76px]" data-name="Image">
      <div className="absolute flex h-[757.352px] items-center justify-center left-[calc(66.67%-23px)] top-[-183px] w-[672px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[757.352px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.256px_193.758px] mask-size-[401.49px_401.49px] relative w-[672px]" data-name="Photo" style={{ maskImage: `url('${imgPhoto}')` }}>
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgPhoto5} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Image9() {
  return (
    <div className="absolute contents left-[calc(66.67%-34px)] top-[-0.5px]" data-name="Image">
      <div className="absolute bg-[#012141] left-[calc(66.67%-34px)] rounded-[12px] size-[424.004px] top-[-0.5px]" data-name="Background" />
      <Image8 />
    </div>
  );
}

function Features4() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[420px] ml-[64px] mt-[103px] overflow-clip relative rounded-[40px] w-[1170px]" data-name="Features #3">
      <Container6 />
      <Image9 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] font-['Outfit:Black',sans-serif] font-black leading-[normal] ml-[116px] mt-0 relative text-[#3870db] text-[200px] text-nowrap text-right translate-x-[-100%] whitespace-pre">
        <p className="mb-0">5</p>
        <p>&nbsp;</p>
      </div>
      <Features4 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute bottom-[666px] content-stretch flex flex-col gap-[45px] items-center justify-center leading-[0] left-[calc(50%-1px)] translate-x-[-50%] w-[1442px]" data-name="List">
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
    </div>
  );
}

export default function Comanda() {
  return (
    <div className="bg-[#f0f0f0] relative size-full" data-name="Comanda">
      <Heder />
      <Header1 />
      <About />
      <List />
    </div>
  );
}