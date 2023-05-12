/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

"use client";

import Heading from "@/components/Heading/Heading";
import Button from "@/components/Button/Button";
import DebitDetailsCard from "@/components/DebitDetailsCard/DebitDetailsCard";

export default function SelectSessionPage() {
  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="p-10 pb-5 -translate-x-3">
        <Heading>Sessions</Heading>
      </div>
      <div className="bg-[#EAEEF3] relative min-h-[66px]">
        <p className="absolute right-4 top-1/2 translate-y-[-50%] p-2 rounded-lg bg-[#D9D9D9] h-34 w-34">
          11
        </p>
      </div>
      <div className="p-5 relative min-h-[76px]">
        <p className="inline-block max-w-[55%] min-w-[200px] text-s leading-5 align-middle">
          Please select a badminton session for this week
        </p>
        <p className="absolute right-4 top-1/2 translate-y-[-50%] p-2 rounded-lg bg-[#D9D9D9] h-34 w-63 font-bold">
          0 / 2
        </p>
      </div>
      <div className="bg-gray-300 flex flex-col-reverse grow overflow-y-auto w-full gap-4 bg-bottom py-4 p-5">
        <DebitDetailsCard
          title="Account Number:"
          text={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et tellus blandit, malesuada sapien in, elementum elit. Proin volutpat est erat, a lacinia odio interdum eget. Proin id nulla ipsum. Nulla eu augue sit amet elit sagittis molestie. Fusce dapibus sit amet est vel condimentum. Praesent pellentesque augue augue, eget congue justo maximus ac. Vivamus pulvinar elit nisi. Suspendisse vel nunc urna. In pulvinar ac enim et rhoncus. Nullam felis urna, dignissim vel ante semper, aliquet porta ligula. Pellentesque a lorem vel est congue pellentesque. Phasellus iaculis commodo ultrices. Cras auctor, nisi et tincidunt scelerisque, nibh nulla suscipit elit, id efficitur est enim quis nisl. Donec velit mauris, rhoncus non euismod vel, hendrerit id ligula. Nullam sit amet nunc orci. Donec sed consectetur nulla. Fusce et dui quis lorem molestie consequat nec sit amet risus. In posuere egestas orci ut tincidunt. Fusce posuere orci non justo imperdiet, et viverra augue pharetra. Morbi nunc neque, interdum ac neque nec, eleifend aliquet lacus. Sed sollicitudin augue vitae nisl ultrices vestibulum. Nunc fermentum posuere quam et faucibus. Integer eget maximus ipsum. Nulla sed ipsum non velit varius rutrum. Proin eleifend egestas accumsan.Nullam mollis sem id ex placerat, sit amet dictum nunc dictum. Phasellus ut purus id erat elementum vehicula nec vitae est. Cras tristique, lacus vitae aliquet pharetra, massa enim laoreet ligula, sollicitudin dignissim quam metus id turpis. Mauris consectetur ultrices bibendum. Praesent non ultrices massa. Nulla ultricies finibus erat, eget tristique arcu. Praesent porttitor faucibus neque at luctus. Curabitur scelerisque quis velit non rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas consequat diam et vehicula pretium. Duis mollis elit vel porta viverra. Nam felis dui, tempus ac imperdiet vel, porta sit amet enim. Phasellus sit amet facilisis urna. Morbi varius elementum lorem id tempor. Fusce tellus enim, elementum ac sagittis quis, vehicula malesuada diam. Interdum et malesuada fames ac ante ipsum primis in faucibus.Praesent dignissim erat sit amet lectus mollis, ac condimentum nisi faucibus. Vivamus fermentum, lectus id facilisis volutpat, orci eros bibendum orci, vitae luctus dolor tortor ac diam. In hac habitasse platea dictumst. Nulla non leo sed lacus molestie pharetra. Pellentesque ullamcorper commodo nunc, nec congue mauris euismod sed. Duis ornare luctus maximus. Sed a urna ac erat porta condimentum non in ex. Curabitur at purus dictum urna hendrerit faucibus. Pellentesque sed placerat dolor, in elementum ligula.Mauris vehicula elit lobortis nulla finibus maximus. Sed lectus arcu, viverra eu diam vitae, consequat elementum ex. Curabitur ex metus, tincidunt id feugiat id, iaculis a enim. Integer pretium eu enim sed molestie. In luctus vestibulum arcu sit amet volutpat. Nullam non neque ante. Cras metus dui, porttitor ac vulputate quis, laoreet fermentum urna. Nullam aliquam urna nec tellus pharetra hendrerit. Aliquam tincidunt pretium tellus, sit amet pharetra quam. Donec lobortis, sem sed posuere pretium, arcu nisi luctus velit, eget pretium lacus sapien nec mauris. Donec libero nisl, scelerisque ac velit sed, dignissim varius arcu. Ut ligula leo, pellentesque sit amet risus quis, lobortis placerat justo. Duis ac auctor dui. Sed convallis elit nec massa viverra luctus. In mattis porttitor nisi nec imperdiet.",
          ]}
          onClick={() => {
            navigator.clipboard.writeText("accountNumber");
          }}
        />
      </div>
      <div className="flex justify-center mt-5 mb-10 bg-gray-300">
        <Button label="next" onClick={() => null} />
      </div>
    </div>
  );
}
