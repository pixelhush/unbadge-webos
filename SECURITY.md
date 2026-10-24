# Security policy

Unbadge is installed on people's TVs, so we take its integrity seriously.

## Reporting a problem privately

Please **don't open a public issue** for security problems. Instead, use GitHub's private reporting:

1. Go to the **Security** tab of this repository.
2. Click **Report a vulnerability**.

Only the maintainer can see these reports. We'll reply as soon as we can.

## What counts as a security problem

- A release `.ipk` that doesn't match the source code, or whose checksum doesn't match `SHA256SUMS.txt`
- Anything in Unbadge that could harm a TV, leak data, or put someone's account at risk
- Problems with the build or release process (supply chain)

The "Asli 4K" badge coming back after a JioHotstar update is **not** a security issue. Please [open a normal issue](../../issues/new/choose) for that.

## Supported versions

Only the [latest release](../../releases/latest) gets fixes.

## Verifying a download

Every release includes a `SHA256SUMS.txt`. Builds are reproducible, so anyone can rebuild the `.ipk` from the tagged source with `npm run build` and get the same checksum.
