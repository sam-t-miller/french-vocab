<script lang="ts">
  import { sampleVocabulary } from './vocabulary/sample-data';
  import { validateVocabulary } from './vocabulary/vocabulary';

  const vocabularyResult = validateVocabulary(sampleVocabulary);
</script>

<svelte:head>
  <title>French vocabulary — sample data</title>
  <meta name="description" content="Inspect the sample French vocabulary model and its inflected forms." />
</svelte:head>

<main>
  <header class="page-header">
    <p class="eyebrow">French vocabulary · model preview</p>
    <h1>Words, with their forms.</h1>
    <p class="subtitle">A small sample to check how lemmas, meanings, and inflections fit together.</p>
  </header>

  {#if vocabularyResult.isOk()}
    <p class="count">{vocabularyResult.value.length} sample entries</p>
    <section class="entries" aria-label="Sample vocabulary entries">
      {#each vocabularyResult.value as entry (entry.id)}
        <article class="entry-card">
          <div class="entry-heading">
            <div>
              <p class="part-of-speech">{entry.partOfSpeech}</p>
              <h2>{entry.article ? `${entry.article} ` : ''}{entry.lemma}</h2>
            </div>
            {#if entry.gender}
              <span class="gender">{entry.gender}</span>
            {/if}
          </div>

          <p class="glosses">
            {#each entry.glosses as gloss, index}
              {#if index > 0}<span aria-hidden="true"> · </span>{/if}
              {gloss.text}{#if gloss.senseCue}<span class="sense"> ({gloss.senseCue})</span>{/if}
            {/each}
          </p>

          {#if entry.forms.length}
            <div class="forms">
              <h3>Forms</h3>
              <ul>
                {#each entry.forms as form}
                  <li>
                    <span class="form-word">{form.form}</span>
                    <span class="form-cue">{form.grammaticalCue}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </article>
      {/each}
    </section>
  {:else}
    <p class="error" role="alert">The sample vocabulary could not be validated: {vocabularyResult.error.message}</p>
  {/if}
</main>
