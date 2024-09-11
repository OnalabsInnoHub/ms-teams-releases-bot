# Microsoft Teams Releases Bot

This action notifies new releases and tags through Microsoft Teams.

## Example usage

```yaml
uses: OnalabsInnoHub/ms-teams-releases-bot@latest
with:
  webhook: ${{ secrets.MS_TEAMS_RELEASES_WEBHOOK }}
  tag-or-release: "tag"
  release-note: "git show ${{ github.ref_name }} | sed -n '/^$/,$p' | sed '/^commit /Q' | tail -n +2"
  version: ${{ github.ref_name }}
  environment: ${{ contains(github.ref_name, "dev") && "development" || "production"}}
  action-url: "https://github.com/${{ github.repository }}/tree/${{ github.ref_name }}"
  application-name: "Onasport Firmware
```
