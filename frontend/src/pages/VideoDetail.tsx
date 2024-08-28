import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/api";
import Loading from "../components/ui/LoadingPage";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { IVideo } from "../types";
import {
  BiSolidLike,
  BiSolidDislike,
  BiSolidBookmarkStar,
} from "react-icons/bi";
import { RiUserUnfollowFill, RiUserFollowLine } from "react-icons/ri";

export default function VideoDetail() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["videoDetail", id],
    queryFn: fetcher(`/api/v1/videos/${id}`),
  });

  if (isLoading) return <Loading />;

  if (!data || error)
    return (
      <div className="center h-full w-full">
        {/*   @ts-ignore */}
        {error?.response?.data?.message || "Something went wrong!"}
      </div>
    );

  const video: IVideo = data.data;

  return (
    // w-full removed from section
    <section className="pb-[70px] sm:ml-[70px] sm:pb-0">
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          <div className="relative mb-4 w-full pt-[56%]">
            <div className="absolute inset-0 border">
              <video
                className="h-full w-full"
                controls={true}
                autoPlay={true}
                muted={true}
              >
                <source
                  src={video.videoFile}
                  //   src="https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div
            className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
            role="button"
            tabIndex={0}
          >
            <div className="flex flex-wrap gap-y-2">
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <h1 className="text-lg font-bold">Advanced React Patterns</h1>
                <p className="flex text-sm text-gray-200">
                  {video.views} Views ·{" "}
                  {formatDistanceToNow(video.createdAt, {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                  <div className="flex overflow-hidden rounded-lg border">
                    <button
                      className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                      data-like={3050}
                      data-like-alt={3051}
                    >
                      <span className="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                        <BiSolidLike />
                      </span>
                    </button>
                    <button
                      className="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                      data-like={20}
                      data-like-alt={21}
                    >
                      <span className="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                        <BiSolidDislike />
                      </span>
                    </button>
                  </div>
                  <div className="relative block">
                    <button className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                      <BiSolidBookmarkStar className="inline-block w-5" />
                      Save
                    </button>
                    {/* save playlist dropdown */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className="mt-2 h-12 w-12 shrink-0">
                  <img
                    src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="reactpatterns"
                    className="h-full w-full rounded-full"
                  />
                </div>
                <div className="block">
                  <p className="text-gray-200">React Patterns</p>
                  <p className="text-sm text-gray-400">757K Subscribers</p>
                </div>
              </div>
              <div className="block">
                <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                  <span className="inline-block w-5">
                    {true ? <RiUserFollowLine /> : <RiUserUnfollowFill />}
                  </span>
                  <span className="group-focus/btn:hidden">Subscribe</span>
                  <span className="hidden group-focus/btn:block">
                    Subscribed
                  </span>
                </button>
              </div>
            </div>
            <hr className="my-4 border-white" />
            <div className="h-5 overflow-hidden group-focus:h-auto">
              <p className="text-sm">
                {video.description}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aperiam ullam earum aliquid tempora temporibus quod
                reprehenderit ipsa velit, qui amet obcaecati. Modi quaerat velit
                quo? Provident quae corrupti odit recusandae? Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Aperiam ullam earum
                aliquid tempora temporibus quod reprehenderit ipsa velit, qui
                amet obcaecati. Modi quaerat velit quo? Provident quae corrupti
                odit recusandae? Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Aperiam ullam earum aliquid tempora temporibus
                quod reprehenderit ipsa velit, qui amet obcaecati. Modi quaerat
                velit quo? Provident quae corrupti odit recusandae? Lorem ipsum
                dolor sit amet consectetur, adipisicing elit. Aperiam ullam
                earum aliquid tempora temporibus quod reprehenderit ipsa velit,
                qui amet obcaecati. Modi quaerat velit quo? Provident quae
                corrupti odit recusandae?
              </p>
            </div>
          </div>
          {/* <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
            <h6 className="font-semibold">573 Comments...</h6>
          </button> */}
        </div>
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          suggesstin
        </div>
      </div>
    </section>
  );
}
