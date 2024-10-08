export default function SavePlaylistDropDown() {
  return (
    <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
      <h3 className="mb-4 text-center text-lg font-semibold">
        Save to playlist
      </h3>
      <ul className="mb-4">
        <li className="mb-2 last:mb-0">
          <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor="Collections-checkbox"
          >
            <input
              type="checkbox"
              className="peer hidden"
              id="Collections-checkbox"
            />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            Collections
          </label>
        </li>
        <li className="mb-2 last:mb-0">
          <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor="JavaScript Basics-checkbox"
          >
            <input
              type="checkbox"
              className="peer hidden"
              id="JavaScript Basics-checkbox"
            />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            JavaScript Basics
          </label>
        </li>
        <li className="mb-2 last:mb-0">
          <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor="C++ Tuts-checkbox"
          >
            <input
              type="checkbox"
              className="peer hidden"
              id="C++ Tuts-checkbox"
            />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            C++ Tuts
          </label>
        </li>
        <li className="mb-2 last:mb-0">
          <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor="Feel Good Music-checkbox"
          >
            <input
              type="checkbox"
              className="peer hidden"
              id="Feel Good Music-checkbox"
            />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            Feel Good Music
          </label>
        </li>
        <li className="mb-2 last:mb-0">
          <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor="Ed Sheeran-checkbox"
          >
            <input
              type="checkbox"
              className="peer hidden"
              id="Ed Sheeran-checkbox"
            />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            Ed Sheeran
          </label>
        </li>
        <li className="mb-2 last:mb-0">
          <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor="Python-checkbox"
          >
            <input
              type="checkbox"
              className="peer hidden"
              id="Python-checkbox"
            />
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </span>
            Python
          </label>
        </li>
      </ul>
      <div className="flex flex-col">
        <label
          htmlFor="playlist-name"
          className="mb-1 inline-block cursor-pointer"
        >
          Name
        </label>
        <input
          className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
          id="playlist-name"
          placeholder="Enter playlist name"
        />
        <button className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
          Create new playlist
        </button>
      </div>
    </div>
  );
}
