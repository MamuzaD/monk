import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="font-bold text-3xl md:text-6xl">About Min Kanban</h1>
      <hr className="w-1/2 xl:w-2/6 mt-2 h-1 bg-neutral-800" />
      <div className="text-xl md:text-2xl mt-10 w-1/2 [&>p]:mt-8">
      <p>
        The first ever time I heard the idea of an kanban board was on the first
        day of my first ever job, at a fast food joint. I mean following that I
        never really saw the concept in action until I came across Trello while
        in my gamedev phase. Mostly due to{" "}
        <Link
          href="https://www.youtube.com/watch?v=60MNrZDnbx0"
          target="_blank"
          className="md:font-medium hover:opacity-80"
        >
          Dani&apos;s
        </Link>{" "}
        antics on Youtube.
      </p>
      <p>
        I used Trello up to my senior year of high school ........ Cras non
        risus nibh. Ut sed justo quis lacus hendrerit interdum. Curabitur tempus
        nisl dolor. Duis malesuada, quam et sollicitudin ullamcorper, ipsum
        purus accumsan est, ac consequat metus augue eu nisl. In accumsan nisi
        tempus diam ornare tristique. Praesent quis augue at sem imperdiet
        aliquam non ut risus. Donec vitae enim id magna finibus maximus. Mauris
        sed enim ac mi consectetur pulvinar ut in dolor.
      </p>
      <p>
        Nullam tempus nibh vel est eleifend mollis non sed felis. Nunc nisi
        dolor, accumsan in metus a, vulputate consectetur massa. Pellentesque
        cursus dolor nisl, ut sollicitudin dui varius bibendum. In sed metus
        nisl. Ut vel laoreet ante, quis rhoncus diam. Morbi sit amet commodo ex,
        cursus fringilla tellus. Aliquam pretium arcu urna, et egestas urna
        commodo in. Donec nec mattis ante. Cras non pellentesque ipsum. Quisque
        id ex mi. Fusce justo odio, semper gravida mi id, condimentum tempor
        erat.
      </p>
      </div>
    </div>
  );
};

export default AboutPage;
