const REDIRECT_QUERY_PARAM = 'p';

export function getGithubPagesRedirectTarget(search = window.location.search) {
  const params = new URLSearchParams(search);
  const target = params.get(REDIRECT_QUERY_PARAM);

  if (!target) {
    return null;
  }

  try {
    return decodeURIComponent(target);
  } catch {
    return target;
  }
}

export function restoreGithubPagesRedirect() {
  const target = getGithubPagesRedirectTarget();

  if (!target || !target.startsWith('/')) {
    return false;
  }

  window.history.replaceState({}, '', target);
  return true;
}
