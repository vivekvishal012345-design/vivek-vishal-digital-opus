<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Markets is part of the static portfolio: repository JSON is validated by shared schemas and prerendered; no runtime backend is required.
- Report coverage contracts, calendar evidence, observation baselines, and conditional scenarios are validated before publication so unavailable research remains explicit rather than fabricated.
- Report publication uses a collaborator-authorized GitHub workflow, append-only revision notes and Git history; deployment is opt-in because saving content must not silently publish it.
- Report types are never deleted: retired types stay in the schema as legacy (readable, correctable, archived at their URLs) while only the publishable-type list accepts new publications.
